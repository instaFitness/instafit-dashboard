import {
  Box,
  IconButton,
  Modal,
  Slide,
  Typography,
  Button,
} from "@mui/material"

import { Close } from "@mui/icons-material"
import moment from "moment"

const ViewModal = ({ handleCloseViewModal, openViewModal, getViewData }) => {
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
              View Social
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
                  Social User
                </Typography>
                <Typography>{getViewData.post_name}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                  Post Title
                </Typography>
                <Typography>{getViewData.post_title}</Typography>
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
                  Description
                </Typography>
                <Typography>{getViewData.post_description}</Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                  <Typography sx={{ fontWeight: "bold", color: "#FAA0A0" }}>
                    Date Posted
                  </Typography>
                  {moment(getViewData.post_date).format("MMMM D YYYY")}
                </Box>
            </Box>
          </Box>
        </div>
      </Slide>
    </Modal>
  )
}

export default ViewModal
