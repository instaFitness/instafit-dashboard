import React, { useState } from "react"
import { TextField, Box, InputAdornment, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"
import { doc, deleteDoc } from "firebase/firestore"
import { database } from "../../firebase/firebase"
import SubscriptionTable from "../../components/subscription/SubscriptionTable"
import { GetSubscriptionsLists } from "../../hooks/subscription/hooks"

const Subscription = () => {
  const [searchText, setSearchText] = useState("")

  const { subscription_items } = GetSubscriptionsLists()

  const handleDeleteRequest = (clickId) => {
    const subscriptionSpecificDoc = doc(database, "subscriptions", clickId)
    deleteDoc(subscriptionSpecificDoc)
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
      </Box>

      {/* REQUEST  TABLE */}
      <SubscriptionTable
        subscription_items={subscription_items}
        searchText={searchText}
        handleDeleteRequest={handleDeleteRequest}
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

export default Subscription
