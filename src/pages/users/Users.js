import React, { useContext, useState } from "react"
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { useGetUserLists } from "../../hooks/users/hooks"
import { usersCollectionRef } from "../../hooks/users/constants"
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import CustomTable from "../../components/user/Table"
import CustomAddModal from "../../components/user/AddModal"
import CustomEditModal from "../../components/user/EditModal"
import { userRole } from "../../mocks/mockData"
import AuthContext from "../../utils/AuthContext"

const Users = () => {
  const { register, updateCreds } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editId, setEditId] = useState("")
  const [searchText, setSearchText] = useState("")

  const { users } = useGetUserLists()

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleChangeStatus = (id, status) => {
    const usersSpecificDoc = doc(database, "users", id)
    if (status === "no") {
      updateDoc(usersSpecificDoc, { subscriptions: "yes" })
    } else {
      updateDoc(usersSpecificDoc, { subscriptions: "no" })
    }
  }

  const handleOpenEditModal = (clickId) => {
    setEditId(clickId)
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values !== "") {
      await register(values.email, values.password)
      await addDoc(usersCollectionRef, {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: values.role,
        subscriptions: "no",
      })
      setSubmitting(false)
      handleCloseModal()
    }
  }

  const handleEditSubmit = async (values, { setSubmitting }) => {
    const userSpecificDoc = doc(database, "users", editId)
    const newFieldUpdate = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      role: values.role,
    }
    await updateCreds(values.email, values.password, values.first_name)
    await updateDoc(userSpecificDoc, newFieldUpdate)
    setSubmitting(false)
    handleCloseEditModal()
  }

  const handleDeleteUser = (clickId) => {
    const userSpecificDoc = doc(database, "users", clickId)
    deleteDoc(userSpecificDoc)
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label='Search Email...'
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
          Add User
        </Button>
      </Box>

      {/* CUSTOM TABLE */}
      <CustomTable
        users={users}
        searchText={searchText}
        handleDeleteUser={handleDeleteUser}
        handleOpenEditModal={handleOpenEditModal}
        handleChangeStatus={handleChangeStatus}
      />

      {/* ADD MODAL */}
      <CustomAddModal
        openModal={openModal}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        userRole={userRole}
      />

      {/* EDIT MODAL */}
      <CustomEditModal
        openEditModal={openEditModal}
        handleEditSubmit={handleEditSubmit}
        handleCloseEditModal={handleCloseEditModal}
        userRole={userRole}
      />
    </Box>
  )
}

export default Users
