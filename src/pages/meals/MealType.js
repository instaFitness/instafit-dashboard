import React, { useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { GetMealTypeLists } from "../../hooks/meals/type/hooks"
import { mealTypeCollectionRef } from "../../hooks/meals/type/constants"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import MealTypeTable from "../../components/meal/meal-type/MealTypeTable"
import AddMealType from "../../components/meal/meal-type/AddModal"
import EditMealTypeModal from "../../components/meal/meal-type/EditModal"
import ViewMealTypes from "../../components/meal/meal-type/ViewModal"

const MealType = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})

  const { mealType } = GetMealTypeLists()

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
    setViewData(viewData)
    setOpenViewModal(true)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    if(values !== "") {
      addDoc(mealTypeCollectionRef, {
        meal: values.meal,
        description: values.description,
      })
      setSubmitting(false)
      handleCloseModal()
    }
  }

  const handleEditSubmit = (values, { setSubmitting }) => {
    const mealTypeSpecificDoc = doc(database, "meal-types", editId)
    const newFieldUpdate = {
      meal: values.meal,
      description: values.description
    }
    updateDoc(mealTypeSpecificDoc, newFieldUpdate)
    setSubmitting(false)
    handleCloseEditModal()
  }
  
  const handleDeleteUser = (clickId) => {
    const mealTypeSpecificDoc = doc(database, "meal-types", clickId)
    deleteDoc(mealTypeSpecificDoc)
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
          Add Meal Type
        </Button>
      </Box>

      <MealTypeTable
        mealType={mealType}
        searchText={searchText}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteUser={handleDeleteUser}
        handleOpenViewModal={handleOpenViewModal}
      />

      {/* ADD MODAL */}
      <AddMealType
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
      />

      {/* EDIT MODAL */}
      <EditMealTypeModal 
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
      />

      {/* VIEW MODAL */}
      <ViewMealTypes
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
    </>
  )
}

export default MealType
