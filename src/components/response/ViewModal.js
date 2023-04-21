import {
  Box,
  IconButton,
  Modal,
  Slide,
  Typography,
  Link,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import moment from "moment"

const ViewModal = ({ handleCloseViewModal, openViewModal, getViewData }) => {
  const inputTimestamp = {
    seconds: Object.keys(getViewData) > 0 ? getViewData.duration.seconds : undefined,
    nanoseconds: Object.keys(getViewData) > 0 ? getViewData.duration.nanoseconds : undefined
  };
  const milliseconds = inputTimestamp.seconds * 1000 + inputTimestamp.nanoseconds / 1000000;
  const dateTime = moment(milliseconds);
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
              View Response Plan
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
                  Meal Image
                </Typography>
                <img
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  src={
                    getViewData.img_url !== "null"
                      ? getViewData.img_url
                      : "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
                  }
                  alt='Meal'
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Meal Procedure
                </Typography>
                <Typography>{getViewData.meal}</Typography>
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
                {Object.keys(getViewData).length > 0
                  ? getViewData.training_url.map((link) => {
                      return (
                        <Link
                          key={getViewData.id}
                          href={link.training_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          View training link
                        </Link>
                      )
                    })
                  : "No Links"}
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Training Procedure
                </Typography>
                <Typography>{getViewData.training_procedure}</Typography>
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
                  User
                </Typography>
                <Typography>{getViewData.user}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Duration
                </Typography>
                <Typography>{dateTime.format("MMMM D YYYY")}</Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </Slide>
    </Modal>
  )
}

export default ViewModal
