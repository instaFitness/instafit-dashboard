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
import { initialValues } from "../../formik-utils/user/initialValues"
import { validationSchema } from "../../formik-utils/user/validationSchema"
import CustomTextField from "../Input"
import CustomSelect from "../CustomSelect"

const CustomAddModal = ({
  handleCloseModal,
  handleSubmit,
  openModal,
  userRole,
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
              Create User
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
              initialValues={initialValues}
              validationSchema={validationSchema}
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
                    <CustomTextField
                      label='First Name'
                      name='first_name'
                      type='text'
                    />
                    <CustomTextField
                      label='Last Name'
                      name='last_name'
                      type='text'
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomTextField label='Email' name='email' type='email' />
                    <CustomTextField
                      label='Password'
                      name='password'
                      type='password'
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomTextField label='Phone #' name='phone' type='text' />
                    <CustomSelect label='Role' name='role' options={userRole} />
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

export default CustomAddModal
