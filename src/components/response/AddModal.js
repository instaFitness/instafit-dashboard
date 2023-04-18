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
import CustomMultiSelect from "../CustomMultiSelect"
import CustomSelect from "../CustomSelect"
import CustomDateInput from "../CustomDateInput"
import CustomTextArea from "../CustomTextArea"
import FileUpload from "../FileUpload"
import { responseInitialValue } from "../../formik-utils/response/initialValues"
import { responseValidationSchema } from "../../formik-utils/response/validationSchema"

const AddModal = ({
  handleCloseModal,
  handleSubmit,
  openModal,
  userOptions,
  bodyPartOptions,
  trainingOptions,
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
              Create Response Plan
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
              initialValues={responseInitialValue}
              validationSchema={responseValidationSchema}
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
                    <CustomSelect
                      label='User'
                      name='user'
                      options={userOptions}
                    />
                    <CustomMultiSelect
                      label='Target Body Parts'
                      name='target_body_parts'
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
                    <CustomMultiSelect
                      label='Training Links'
                      name='training_url'
                      options={trainingOptions}
                    />
                    <CustomDateInput
                      name='duration'
                      label='Duration'
                      inputFormat='MM/dd/yyyy'
                    />
                  </Box>
                  <Box>
                    <CustomTextArea
                      label='Training Procedure'
                      name='training_procedure'
                      options={trainingOptions}
                    />
                  </Box>
                  <Box sx={{marginBottom: 2,}}>
                    <Typography sx={{marginBottom: 1, color: "#FAA0A0"}}>Meal Image</Typography>
                    <FileUpload name='file' maxSize={2 * 1024 * 1024} />
                  </Box>
                  <Box>
                    <CustomTextArea name='meal' label="Meal Procedure" />
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

export default AddModal
