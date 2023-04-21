import React, { useContext } from "react"
import { Box, Button, Typography, Avatar } from "@mui/material"
import Logo from "../../assets/logo.png"
import { loginInitialValues } from "../../formik-utils/auth/initialValues"
import { loginValidationSchema } from "../../formik-utils/auth/validationSchema"
import { Login } from "@mui/icons-material"
import { Formik, Form } from "formik"
import CustomTextField from "../../components/Input"
import AuthContext from "../../utils/AuthContext"
import { Link } from "react-router-dom"

const AuthLogin = () => {
  const { login } = useContext(AuthContext)
  const handleSubmit = async (values, { setSubmitting }) => {
    await login(values.email, values.password)
    setSubmitting(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(45deg, #ECF0F1 72%, #FAA0A0 72%)",
      }}
    >
      <Box sx={{ width: "50%", height: "100%", overflowY: "hidden" }}>
        <Box
          component='img'
          src='https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpdG5lc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          alt='Login Image'
          sx={{
            width: "100%",
            height: "100%",
            opacity: 0.6,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box sx={{ padding: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt='Logo'
              src={Logo}
              sx={{ width: "25%", height: "25%" }}
            />
          </Box>
          <Typography variant='h4' sx={{ textAlign: "center" }} gutterBottom>
            <span style={{ color: "#FFFFFF" }}>InstaFit</span>
          </Typography>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
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
                  <CustomTextField label='Email' name='email' />
                  <CustomTextField
                    label='Password'
                    name='password'
                    type='password'
                  />
                </Box>
                <Link to="/forgot-password">Forgot Password</Link>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: "#FFF",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#FFF",
                        color: "#000",
                      },
                      fontWeight: "bold",
                    }}
                    endIcon={<Login />}
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthLogin
