import {
  Box,
  IconButton,
  Modal,
  Slide,
  Typography,
  Button,
} from "@mui/material"

import { Close } from "@mui/icons-material"

const ViewMealPlan = ({ handleCloseViewModal, openViewModal, getViewData }) => {
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
              View Meal Plan
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
                marginBottom: 3,
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Image Uploaded
                </Typography>
                <img
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  src={
                    getViewData.image_url !== "null"
                      ? getViewData.image_url
                      : "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
                  }
                  alt='Meal'
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  ID Number
                </Typography>
                <Typography>{getViewData.id}</Typography>
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
                  Meal Plan
                </Typography>
                <Typography>{getViewData.meal_plan}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Meal Time
                </Typography>
                <Typography>{getViewData.meal_time}</Typography>
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
                  Meal Type
                </Typography>
                {Object.keys(getViewData).length > 0
                  ? getViewData.meal_type.map((type, i) => {
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
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Description
                </Typography>
                <Typography>{getViewData.description}</Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </Slide>
    </Modal>
  )
}

export default ViewMealPlan
