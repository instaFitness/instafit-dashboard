import { FileOpen } from "@mui/icons-material"
import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"

const PlanRequestCard = ({ request_plan }) => {
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
            <FileOpen sx={{ fontSize: 100, color: "white" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography gutterBottom variant='h5' component='div'>
              Requested Plans
            </Typography>
            <Typography gutterBottom variant='h5' component='div'>
              {request_plan.length}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PlanRequestCard
