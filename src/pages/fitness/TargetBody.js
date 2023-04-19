import React, { useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import { GetBodyPartsLists } from "../../hooks/fitness/parts/hooks"
import { bodyPartsCollectionRef } from "../../hooks/fitness/parts/constants"
import EditBodyPartModal from "../../components/fitness/target-body/EditModal"
import TargetBodyTable from "../../components/fitness/target-body/TargetBodyTable"
import AddBodyPart from "../../components/fitness/target-body/AddModal"
import ViewTargetModal from "../../components/fitness/target-body/ViewModal"

const TargetBody = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})

  const { bodyParts } = GetBodyPartsLists()

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenEditModal = (clickId) => {
    setEditId(clickId)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleOpenViewModal = (viewData) => {
    console.log("viewData", viewData)
    setViewData(viewData)
    setOpenViewModal(true)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    if(values !== "") {
      addDoc(bodyPartsCollectionRef, {
        body: values.body,
        description: values.description,
      })
      setSubmitting(false)
      handleCloseModal()
    }
  }

  const handleEditSubmit = (values, { setSubmitting }) => {
    const bodyPartSpecificDoc = doc(database, "target-body", editId)
    const newFieldUpdate = {
      body: values.body,
      description: values.description
    }
    updateDoc(bodyPartSpecificDoc, newFieldUpdate)
    setSubmitting(false)
    handleCloseEditModal()
  }
  
  const handleDeleteUser = (clickId) => {
    const bodyPartSpecificDoc = doc(database, "target-body", clickId)
    deleteDoc(bodyPartSpecificDoc)
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
          Add Target Body
        </Button>
      </Box>

      <TargetBodyTable
        bodyParts={bodyParts}
        searchText={searchText}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteUser={handleDeleteUser}
        handleOpenViewModal={handleOpenViewModal}
      />

      {/* ADD MODAL */}
      <AddBodyPart
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
      />

      {/* EDIT MODAL */}
      <EditBodyPartModal 
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
      />

      {/* VIEW MODAL */}
      <ViewTargetModal
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
    </>
  )
}

export default TargetBody
