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
import CustomInput from "../Input"
import FileUpload from "../FileUpload"
import { editResponseInitialValues } from "../../formik-utils/response/initialValues"
import { editResponseValidationSchema } from "../../formik-utils/response/validationSchema"

const EditModal = ({
  handleCloseEditModal,
  handleEditSubmit,
  openEditModal,
  userOptions,
  bodyPartOptions,
  trainingOptions,
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
              Edit Response Plan
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
              overflowY: "scroll",
              height: 400,
            }}
          >
            <Formik
              initialValues={editId || editResponseInitialValues}
              validationSchema={editResponseValidationSchema}
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
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ marginBottom: 1, color: "#FAA0A0" }}>
                      Meal Image
                    </Typography>
                    <FileUpload name='file' maxSize={2 * 1024 * 1024} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ marginRight: 2 }}>
                      <CustomInput
                        label='Breakfast Name'
                        name='breakfast_name'
                      />
                      <CustomTextArea
                        name='breakfast_procedure'
                        label='Breakfast Procedure'
                      />
                    </Box>
                    <Box>
                      <CustomInput label='Lunch Name' name='lunch_name' />
                      <CustomTextArea
                        name='lunch_procedure'
                        label='Lunch Procedure'
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CustomInput label='Dinner Name' name='dinner_name' />
                    <CustomTextArea
                      name='dinner_procedure'
                      label='Dinner Procedure'
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

export default EditModal
