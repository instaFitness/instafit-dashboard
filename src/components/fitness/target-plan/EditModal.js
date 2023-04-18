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
import { editFitnessPlanInitialValue } from "../../../formik-utils/fitness/initialValues"
import { editFitnessPlanValidationSchema } from "../../../formik-utils/fitness/validationSchema"
import CustomTextField from "../../Input"
import CustomSelect from "../../CustomSelect"
import CustomMultiSelect from "../../CustomMultiSelect"

const EditFitnessPlanModal = ({
  openEditModal,
  handleEditSubmit,
  handleCloseEditModal,
  intensity,
  bodyPartOptions,
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
              Edit Meal Plan
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
              initialValues={editFitnessPlanInitialValue}
              validationSchema={editFitnessPlanValidationSchema}
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
                    <CustomTextField label='Workout Name' name='name' />
                    <CustomTextField
                      label='Target Loose Weight (kg)'
                      name='target_lose'
                      type='number'
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomSelect
                      label='Intensity Level'
                      name='intensity'
                      options={intensity}
                    />
                    <CustomMultiSelect
                      label='Target Body Parts'
                      name='target_body'
                      options={bodyPartOptions}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomTextField
                      label='Description'
                      name='description'
                      type='text'
                    />
                    <CustomTextField
                      label='General Procedure'
                      name='procedure'
                      type='text'
                    />
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

export default EditFitnessPlanModal
