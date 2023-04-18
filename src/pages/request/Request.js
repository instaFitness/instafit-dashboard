import React, { useState } from "react"
import { TextField, Box, InputAdornment, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import RequestTable from "../../components/request/RequestTable"
import { GetRequestPlanList } from "../../hooks/requests/hooks"

const Request = () => {
  const [searchText, setSearchText] = useState("")

  const { request_plan } = GetRequestPlanList()

  const handleChangeStatus = (id, status) => {
    const requestPlanSpecificDoc = doc(database, "request_plan", id)
    if (status === "Not Processed") {
      updateDoc(requestPlanSpecificDoc, { request_status: "Processed" })
    } else {
      updateDoc(requestPlanSpecificDoc, { request_status: "Not Processed" })
    }
  }

  const handleDeleteRequest = (clickId) => {
    const mealTypeSpecificDoc = doc(database, "request_plan", clickId)
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
          label='Search Request User...'
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

      {/* REQUEST  TABLE */}
      <RequestTable
        request_plan={request_plan}
        searchText={searchText}
        handleDeleteRequest={handleDeleteRequest}
        handleChangeStatus={handleChangeStatus}
      />

      {/* VIEW MODAL */}
      {/* <ViewModal
        getViewData={getViewData}
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      /> */}
    </>
  )
}

export default Request
