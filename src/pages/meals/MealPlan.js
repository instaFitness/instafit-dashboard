import React, { useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { GetMealPlanLists } from "../../hooks/meals/plan/hooks"
import { GetMealTypeLists } from "../../hooks/meals/type/hooks"
import { GetImageLists } from "../../hooks/images/hooks"
import { mealTime, mealPlanSubscription } from "../../mocks/mockData"
import { mealPlanCollectionRef } from "../../hooks/meals/plan/constants"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database, storage } from "../../firebase/firebase"
import MealPlanTable from "../../components/meal/meal-plan/MealPlanTable"
import AddMealPlan from "../../components/meal/meal-plan/AddModal"
import EditMealPlanModal from "../../components/meal/meal-plan/EditModal"
import ViewMealPlan from "../../components/meal/meal-plan/ViewModal"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

const MealPlan = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")

  const { mealType } = GetMealTypeLists()
  const { mealPlan } = GetMealPlanLists()
  const { imageList } = GetImageLists()

  const mealTypeOptions = mealType.map((mealName) => {
    const options = {
      label: mealName.meal,
      value: mealName.meal,
    }
    return options
  })

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenEditModal = (obj) => {
    setEditId(obj)
    setOpenEditModal(true)
  }

  const handleOpenViewModal = (viewData) => {
    setViewData(viewData)
    setOpenViewModal(true)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
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
            await addDoc(mealPlanCollectionRef, {
              meal_plan: values.meal_plan,
              calories_count: values.calories_count,
              meal_time: values.meal_time,
              meal_type: values.meal_type,
              subscription_type: values.subscription_type,
              image_ref: values.file.name,
              description: values.description,
              image_url: downloadURL,
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

  const handleEditSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    const mealTypeSpecificDoc = doc(database, "meal-plan", editId.id)
    const imageRef = ref(storage, `images/${editId.image_ref}`)
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
            meal_plan: values.meal_plan,
            calories_count: values.calories_count,
            meal_time: values.meal_time,
            meal_type: values.meal_type,
            subscription_type: values.subscription_type,
            description: values.description,
            image_ref: values.file.name,
            image_url: downloadURL,
          }
          await updateDoc(mealTypeSpecificDoc, newFieldUpdate)
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
    const mealTypeSpecificDoc = doc(database, "meal-plan", clickId)
    const checkifFileExists = imageList.includes(imageStored)
    if(imageStored === undefined || checkifFileExists) {
      const imageRef = ref(storage, `images/${imageStored}`)
      await deleteObject(imageRef)
      await deleteDoc(mealTypeSpecificDoc)
    } else {
      await deleteDoc(mealTypeSpecificDoc)
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
          label='Search name...'
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
          Add Meal Plan
        </Button>
      </Box>

      {/* MEAL TYPE TABLE */}
      <MealPlanTable
        mealPlan={mealPlan}
        searchText={searchText}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteUser={handleDeleteUser}
        handleOpenViewModal={handleOpenViewModal}
      />

      {/* ADD MODAL */}
      <AddMealPlan
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        mealTime={mealTime}
        mealTypeOptions={mealTypeOptions}
        mealPlanSubscription={mealPlanSubscription}
      />

      {/* EDIT MODAL */}
      <EditMealPlanModal
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
        mealTime={mealTime}
        editId={editId}
        mealTypeOptions={mealTypeOptions}
        mealPlanSubscription={mealPlanSubscription}
      />

      {/* VIEW MODAL */}
      <ViewMealPlan
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
    </>
  )
}

export default MealPlan
