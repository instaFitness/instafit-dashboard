import React, { useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { GetBodyPartsLists } from "../../hooks/fitness/parts/hooks"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database, storage } from "../../firebase/firebase"
import AddModal from "../../components/response/AddModal"
import ResponseTable from "../../components/response/ResponseTable"
import EditModal from "../../components/response/EditModal"
import ViewModal from "../../components/response/ViewModal"
import { useGetUserLists } from "../../hooks/users/hooks"
import { GetRespondList } from "../../hooks/response/hooks"
import { GetTrainingPlanLists } from "../../hooks/trainings/hooks"
import { GetImageLists } from "../../hooks/images/hooks"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { respondCollectionRef } from "../../hooks/response/constants"

const ResponseList = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")

  const { resPlanList } = GetRespondList()
  const { users } = useGetUserLists()
  const { bodyParts } = GetBodyPartsLists()
  const { trainings } = GetTrainingPlanLists()
  const { imageList } = GetImageLists()
  const trainingOptions = trainings.map((training) => {
    const options = {
      label: training.workout_name,
      value: training.url,
    }
    return options
  })
  const userOptions = users
    .map((user) => {
      const options = {
        label: user.email,
        value: user.email,
      }
      return options
    })
    .filter((item, index, array) => {
      return array.findIndex((other) => other.value === item.value) === index
    })
  const bodyPartOptions = bodyParts.map((part) => {
    const options = {
      label: part.body,
      value: part.body,
    }
    return options
  })

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenEditModal = (responseData) => {
    setEditId(responseData)
    setOpenEditModal(true)
  }

  const handleOpenViewModal = (viewData) => {
    setViewData(viewData)
    setOpenViewModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleSubmit = (values, { setSubmitting, setStatus, resetForm }) => {
    if (values !== "") {
      const storageRef = ref(storage, `images/${values.file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, values.file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setStatus({ error: error.message })
          setSubmitting(false)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          try {
            await addDoc(respondCollectionRef, {
              user: values.user,
              duration: values.duration,
              training_url: values.training_url,
              target_body_parts: values.target_body_parts,
              training_procedure: values.training_procedure,
              img_ref: values.file.name,
              img_url: downloadURL,
              breakfast_name: values.breakfast_name,
              breakfast_procedure: values.breakfast_procedure,
              lunch_name: values.lunch_name,
              lunch_procedure: values.lunch_procedure,
              dinner_name: values.dinner_name,
              dinner_procedure: values.dinner_procedure,
            })
          } catch (error) {
            console.error("Error saving image URL to Firestore:", error)
          }
          setSubmitting(false)
          resetForm()
          setStatus({ error: null })
          handleCloseModal()
        }
      )
    }
  }

  const handleEditSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    const responseSpecificDoc = doc(database, "respond_plans", editId.id)
    const imageRef = ref(storage, `images/${editId.img_ref}`)
    const storageRef = ref(storage, `images/${values.file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, values.file)
    await deleteObject(imageRef)
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setStatus({ error: error.message })
        setSubmitting(false)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        try {
          const newFieldUpdate = {
            user: values.user,
            duration: values.duration,
            training_url: values.training_url,
            target_body_parts: values.target_body_parts,
            training_procedure: values.training_procedure,
            img_ref: values.file.name,
            img_url: downloadURL,
            breakfast_name: values.breakfast_name,
            breakfast_procedure: values.breakfast_procedure,
            lunch_name: values.lunch_name,
            lunch_procedure: values.lunch_procedure,
            dinner_name: values.dinner_name,
            dinner_procedure: values.dinner_procedure,
          }
          await updateDoc(responseSpecificDoc, newFieldUpdate)
        } catch (error) {
          console.error("Error saving image URL to Firestore:", error)
        }
        setSubmitting(false)
        resetForm()
        setStatus({ error: null })
        handleCloseEditModal()
      }
    )
  }

  const handleDeleteUser = async (clickId, imageStored) => {
    const responseSpecificDoc = doc(database, "respond_plans", clickId)
    const checkifFileExists = imageList.includes(imageStored)
    if(imageStored === undefined || checkifFileExists) {
      const imageRef = ref(storage, `images/${imageStored}`)
      await deleteObject(imageRef)
      await deleteDoc(responseSpecificDoc)
    } else {
      await deleteDoc(responseSpecificDoc)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label='Search User...'
          variant='outlined'
          sx={{
            marginY: 2,
            "& .MuiInputLabel-root": {
              color: "#FAA0A0",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FAA0A0",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#FAA0A0",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FAA0A0",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FAA0A0",
            },
          }}
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <Search
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      color: "#FAA0A0",
                      width: "100%",
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={() => handleOpenModal()}
          variant='contained'
          sx={{
            backgroundColor: "#FAA0A0",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#FAA0A0",
              color: "#FFF",
            },
            fontWeight: "bold",
          }}
          endIcon={<Add />}
        >
          Add Response Plan
        </Button>
      </Box>

      <ResponseTable
        responseList={resPlanList}
        searchText={searchText}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteUser={handleDeleteUser}
        handleOpenViewModal={handleOpenViewModal}
      />

      {/* ADD MODAL */}
      <AddModal
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        userOptions={userOptions}
        bodyPartOptions={bodyPartOptions}
        trainingOptions={trainingOptions}
      />

      {/* EDIT MODAL */}
      <EditModal
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
        userOptions={userOptions}
        bodyPartOptions={bodyPartOptions}
        trainingOptions={trainingOptions}
        editId={editId}
      />

      {/* VIEW MODAL */}
      <ViewModal
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
    </>
  )
}

export default ResponseList
