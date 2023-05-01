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
import { editMealPlanInitialValue } from "../../../formik-utils/meals/initialValues"
import { editMealPlanValidationSchema } from "../../../formik-utils/meals/validationSchema"
import CustomSelect from "../../CustomSelect"
import CustomMultiSelect from "../../CustomMultiSelect"
import FileUpload from "../../FileUpload"
import CustomTextArea from "../../CustomTextArea"

const EditMealPlanModal = ({
  openEditModal,
  handleEditSubmit,
  handleCloseEditModal,
  mealTime,
  mealTypeOptions,
  editId,
  mealPlanSubscription,
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
              initialValues={editId || editMealPlanInitialValue}
              validationSchema={editMealPlanValidationSchema}
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
                    <CustomTextField label='Meal Plan' name='meal_plan' />
                    <CustomTextField
                      label='Calories Count'
                      name='calories_count'
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
                      label='Meal Category'
                      name='meal_time'
                      options={mealTime}
                    />
                    <CustomMultiSelect
                      label='Meal Type'
                      name='meal_type'
                      options={mealTypeOptions}
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
                      label='Subscription Type'
                      name='subscription_type'
                      options={mealPlanSubscription}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomTextArea
                      label='Description'
                      name='description'
                      type='text'
                    />
                  </Box>
                  <Box>
                    <FileUpload name='file' maxSize={2 * 1024 * 1024} />
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

export default EditMealPlanModal
