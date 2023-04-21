import {
  Box,
  IconButton,
  Button,
  Modal,
  Slide,
  Typography,
} from "@mui/material"
import { Close, ArrowUpward } from "@mui/icons-material"
import { Formik, Form } from "formik"
import CustomTextField from "../../Input"
import { editMealTypeInitialValues } from "../../../formik-utils/meals/initialValues"
import { editMealTypeValidationSchema } from "../../../formik-utils/meals/validationSchema"

const EditMealTypeModal = ({
  openEditModal,
  handleEditSubmit,
  handleCloseEditModal,
  editId,
}) => {
  return (
    <Modal
      open={openEditModal}
      onClose={handleCloseEditModal}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Slide direction='down' in={openEditModal} mountOnEnter unmountOnExit>
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
              Edit Meal Type
            </Typography>
            <IconButton
              onClick={() => handleCloseEditModal()}
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
            <Formik
              initialValues={editId || editMealTypeInitialValues}
              validationSchema={editMealTypeValidationSchema}
              onSubmit={handleEditSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomTextField label='Meal' name='meal' type='text' />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomTextField label='Description' name='description' type='text' />
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: "#FAA0A0",
                      color: "#FFF",
                      "&:hover": {
                        backgroundColor: "#FAA0A0",
                        color: "#FFF",
                      },
                      fontWeight: "bold",
                    }}
                    endIcon={<ArrowUpward />}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
              )}
            </Formik>
          </Box>
        </div>
      </Slide>
    </Modal>
  )
}

export default EditMealTypeModal
