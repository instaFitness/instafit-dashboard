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
import { fitnessPlanInitialValue } from "../../../formik-utils/fitness/initialValues"
import { fitnessPlanValidationSchema } from "../../../formik-utils/fitness/validationSchema"
import CustomTextField from "../../Input"
import CustomMultiSelect from "../../CustomMultiSelect"
import CustomSelect from "../../CustomSelect"

const AddFitnessPlan = ({
  handleCloseModal,
  handleSubmit,
  openModal,
  intensity,
  bodyPartOptions,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Slide direction='down' in={openModal} mountOnEnter unmountOnExit>
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
              Create Fitness Plan
            </Typography>
            <IconButton
              onClick={() => handleCloseModal()}
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
              initialValues={fitnessPlanInitialValue}
              validationSchema={fitnessPlanValidationSchema}
              onSubmit={handleSubmit}
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

export default AddFitnessPlan
