import {
  Box,
  IconButton,
  Modal,
  Slide,
  Typography,
  Button,
} from "@mui/material"

import { Close } from "@mui/icons-material"

const ViewFitnessPlan = ({
  handleCloseViewModal,
  openViewModal,
  getViewData,
}) => {
  return (
    <Modal
      open={openViewModal}
      onClose={handleCloseViewModal}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Slide direction='down' in={openViewModal} mountOnEnter unmountOnExit>
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "800px",
            width: "90%",
            borderRadius: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#FAA0A0",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: "#FFF",
                margin: 3,
                fontWeight: "bold",
              }}
            >
              View Fitness Plan
            </Typography>
            <IconButton
              onClick={() => handleCloseViewModal()}
              aria-label='add'
              sx={{ border: "2px solid #FFF", color: "#FFF", margin: 3 }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              padding: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Workout Name
                </Typography>
                <Typography>{getViewData.name}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Target Loose Weight (kg)
                </Typography>
                <Typography>{getViewData.target_weight}</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Intensity
                </Typography>
                <Typography>{getViewData.intensity}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Intensity
                </Typography>
                {Object.keys(getViewData).length > 0
                  ? getViewData.target_body.map((type, i) => {
                      return (
                        <Button
                          key={i}
                          variant='contained'
                          size='small'
                          sx={{
                            backgroundColor: "#FF5C5C",
                            color: "#FFF",
                            marginRight: 2,
                            "&:hover": {
                              backgroundColor: "#FAA0A0",
                              color: "#FFF",
                            },
                          }}
                        >
                          {type}
                        </Button>
                      )
                    })
                  : ""}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Description
                </Typography>
                <Typography>{getViewData.description}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Procedure
                </Typography>
                <Typography>{getViewData.procedure}</Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </Slide>
    </Modal>
  )
}

export default ViewFitnessPlan
