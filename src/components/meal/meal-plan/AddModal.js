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
import { mealPlanInitialValue } from "../../../formik-utils/meals/initialValues"
import { mealPlanValidationSchema } from "../../../formik-utils/meals/validationSchema"
import CustomTextField from "../../Input"
import CustomMultiSelect from "../../CustomMultiSelect"
import CustomSelect from "../../CustomSelect"
import FileUpload from "../../FileUpload"
import CustomTextArea from "../../CustomTextArea"

const AddMealPlan = ({
  handleCloseModal,
  handleSubmit,
  openModal,
  mealTime,
  mealTypeOptions,
  mealPlanSubscription,
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
              Create Meal Plan
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
              initialValues={mealPlanInitialValue}
              validationSchema={mealPlanValidationSchema}
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
                  <Box sx={{ textAlign: "right", marginTop: 5 }}>
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

export default AddMealPlan
