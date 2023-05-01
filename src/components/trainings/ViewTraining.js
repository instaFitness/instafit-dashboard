import {
  Box,
  IconButton,
  Modal,
  Slide,
  Typography,
  Button,
  Link,
} from "@mui/material"
import moment from "moment"
import { Close } from "@mui/icons-material"

const ViewTraining = ({ handleCloseViewModal, openViewModal, getViewData }) => {
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
              View Training Plan
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
              overflowY: "scroll",
              height: 400,
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
                  ID Number
                </Typography>
                <Typography>{getViewData.id}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Name
                </Typography>
                <Typography>{getViewData.name}</Typography>
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
                  Trainer Name
                </Typography>
                <Typography>{getViewData.trainer}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Training Type
                </Typography>
                <Typography>{getViewData.type}</Typography>
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
                  Target Body Parts
                </Typography>
                {Object.keys(getViewData).length > 0
                  ? getViewData.target_parts.map((part, i) => {
                      return (
                        <Button
                          key={i}
                          variant='contained'
                          size='small'
                          sx={{
                            backgroundColor: "#FF5C5C",
                            color: "#FFF",
                            marginRight: 1,
                            "&:hover": {
                              backgroundColor: "#FAA0A0",
                              color: "#FFF",
                            },
                          }}
                        >
                          {part}
                        </Button>
                      )
                    })
                  : ""}
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Subscriptions
                </Typography>
                <Button
                  variant='contained'
                  size='small'
                  sx={{
                    backgroundColor:
                      getViewData.subscriptions === "free"
                        ? "#85C1E9"
                        : "#58D68D",
                    color: "#FFF",
                    marginRight: 2,
                    "&:hover": {
                      backgroundColor:
                        getViewData.subscriptions === "free"
                          ? "#85C1E9"
                          : "#58D68D",
                      color: "#FFF",
                    },
                  }}
                >
                  {getViewData.subscriptions}
                </Button>
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
                  Training Link
                </Typography>
                <Link
                  key={getViewData.id}
                  href={getViewData.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View training link
                </Link>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Date Created
                </Typography>
                <Typography>
                  {moment(new Date()).format("MMM DD YYYY hh:mm a")}
                </Typography>
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
                  Workout Name
                </Typography>
                <Typography>
                  {getViewData.workout_name}
                </Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Target Loose Calories
                </Typography>
                <Typography>
                  {getViewData.target_loose}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  General Procedure
                </Typography>
                <Typography>
                  {getViewData.general_procedure}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </Slide>
    </Modal>
  )
}

export default ViewTraining
