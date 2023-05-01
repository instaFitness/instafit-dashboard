import React, { useState } from "react"
import { TextField, Box, InputAdornment, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"
import { doc, deleteDoc } from "firebase/firestore"
import { database, storage } from "../../firebase/firebase"
import SocialTable from "../../components/social/SocialTable"
import ViewModal from "../../components/social/ViewModal"
import { ref, deleteObject } from "firebase/storage"
import { GetSocialsLists } from "../../hooks/socials/hooks"

const Social = () => {
  const [openViewModal, setOpenViewModal] = useState(false)
  const [getViewData, setViewData] = useState({})
  const [searchText, setSearchText] = useState("")

  const { socials } = GetSocialsLists()

  const handleOpenViewModal = (viewData) => {
    setViewData(viewData)
    setOpenViewModal(true)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleDeleteSocial = async (clickId, imageStored) => {
    console.log("imageStored", imageStored)
    console.log("clickId", clickId)
    const imageRef = ref(storage, `images/${imageStored}`)
    const socialSpecificDoc = doc(database, "social", clickId)
    deleteObject(imageRef)
    deleteDoc(socialSpecificDoc)
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
          label='Search Title...'
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
      </Box>

      {/* SOCIAL  TABLE */}
      <SocialTable
        socials={socials}
        searchText={searchText}
        handleDeleteSocial={handleDeleteSocial}
        handleOpenViewModal={handleOpenViewModal}
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

export default Social
