import React, { useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { intensity } from "../../mocks/mockData"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import { fitnessPlanCollectionRef } from "../../hooks/fitness/plan/constants"
import { GetFitnessPlanLists } from "../../hooks/fitness/plan/hooks"
import { GetBodyPartsLists } from "../../hooks/fitness/parts/hooks"
import FitnessPlanTable from "../../components/fitness/target-plan/FitnessPlanTable"
import AddFitnessPlan from "../../components/fitness/target-plan/AddModal"
import ViewFitnessPlan from "../../components/fitness/target-plan/ViewModal"
import EditFitnessPlanModal from "../../components/fitness/target-plan/EditModal"

const FitnessPlan = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")

  const { plans } = GetFitnessPlanLists()
  const { bodyParts } = GetBodyPartsLists()

  const bodyPartOptions = bodyParts.map((targetBody) => {
    const options = {
      label: targetBody.body,
      value: targetBody.body,
    }
    return options
  })

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

  const handleOpenViewModal = (viewData) => {
    setViewData(viewData)
    setOpenViewModal(true)
  }

  const handleCloseViewModal = (viewData) => {
    setOpenViewModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    if (values !== "") {
      addDoc(fitnessPlanCollectionRef, {
        name: values.name,
        target_weight: values.target_lose,
        intensity: values.intensity,
        target_body: values.target_body,
        description: values.description,
        procedure: values.procedure,
      })
      setSubmitting(false)
      handleCloseModal()
    }
  }

  const handleEditSubmit = (values, { setSubmitting }) => {
    const fitnessPlanSpecificDoc = doc(database, "fitness-plan", editId)
    const newFieldUpdate = {
      name: values.name,
      target_weight: values.target_lose,
      intensity: values.intensity,
      target_body: values.target_body,
      description: values.description,
      procedure: values.procedure,
    }
    updateDoc(fitnessPlanSpecificDoc, newFieldUpdate)
    setSubmitting(false)
    handleCloseEditModal()
  }

  const handleDeleteUser = (clickId) => {
    const planSpecificDoc = doc(database, "fitness-plan", clickId)
    deleteDoc(planSpecificDoc)
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
          Add Fitness Plan
        </Button>
      </Box>

      {/* FITNESS PLAN TABLE */}
      <FitnessPlanTable
        plans={plans}
        searchText={searchText}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteUser={handleDeleteUser}
        handleOpenViewModal={handleOpenViewModal}
      />

      {/* ADD MODAL */}
      <AddFitnessPlan
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        intensity={intensity}
        bodyPartOptions={bodyPartOptions}
      />

      {/* EDIT MODAL */}
      <EditFitnessPlanModal
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
        intensity={intensity}
        bodyPartOptions={bodyPartOptions}
      />

      {/* VIEW MODAL */}
      <ViewFitnessPlan
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
    </>
  )
}

export default FitnessPlan
