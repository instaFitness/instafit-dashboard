import React, { useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import moment from "moment"
import { GetTrainingPlanLists } from "../../hooks/trainings/hooks"
import { GetBodyPartsLists } from "../../hooks/fitness/parts/hooks"
import { trainingType, subscriptionType } from "../../mocks/mockData"
import { trainingsCollectionRef } from "../../hooks/trainings/constants"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import TrainingTable from "../../components/trainings/TrainingTable"
import AddTraining from "../../components/trainings/AddTraining"
import EditTraining from "../../components/trainings/EditTraining"
import ViewTraining from "../../components/trainings/ViewTraining"

const TrainingPlan = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")

  const { trainings } = GetTrainingPlanLists()
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

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    if (values !== "") {
      addDoc(trainingsCollectionRef, {
        name: values.name,
        trainer: values.trainer,
        type: values.type,
        url: values.url,
        subscriptions: values.subscriptions,
        target_parts: values.target_parts,
        workout_name: values.workout_name,
        target_loose: values.target_loose,
        general_procedure: values.general_procedure,
        date: moment(new Date()).format("MMM-DD-YYYY hh:mm"),
      })
      setSubmitting(false)
      handleCloseModal()
    }
  }

  const handleEditSubmit = (values, { setSubmitting }) => {
    const trainingSpecificDoc = doc(database, "trainings", editId)
    const newFieldUpdate = {
      name: values.name,
      trainer: values.trainer,
      type: values.type,
      url: values.url,
      subscriptions: values.subscriptions,
      target_parts: values.target_parts,
      workout_name: values.workout_name,
      target_loose: values.target_loose,
      general_procedure: values.general_procedure,
      date: moment(new Date()).format("MMM-DD-YYYY hh:mm"),
    }
    updateDoc(trainingSpecificDoc, newFieldUpdate)
    setSubmitting(false)
    handleCloseEditModal()
  }

  const handleDeleteUser = (clickId) => {
    const trainingSpecificDoc = doc(database, "trainings", clickId)
    deleteDoc(trainingSpecificDoc)
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
          Add Training Plan
        </Button>
      </Box>

      <TrainingTable
        trainings={trainings}
        searchText={searchText}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteUser={handleDeleteUser}
        handleOpenViewModal={handleOpenViewModal}
      />

      {/* ADD MODAL */}
      <AddTraining
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        trainingType={trainingType}
        bodyPartOptions={bodyPartOptions}
        subscriptionType={subscriptionType}
      />

      {/* EDIT MODAL */}
      <EditTraining
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
        trainingType={trainingType}
        subscriptionType={subscriptionType}
        bodyPartOptions={bodyPartOptions}
      />

      {/* VIEW MODAL */}
      <ViewTraining
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
    </>
  )
}

export default TrainingPlan
