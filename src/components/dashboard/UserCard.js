import { Face } from "@mui/icons-material"
import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"

const UserCard = ({ users }) => {
  return (
    <Card sx={{ minWidth: 49 + "%", height: 140, backgroundColor: "#FAA0A0" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Face sx={{ fontSize: 100, color: "white" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography gutterBottom variant='h5' component='div'>
              Users
            </Typography>
            <Typography gutterBottom variant='h5' component='div'>
              {users.length}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserCard
