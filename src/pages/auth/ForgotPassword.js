import { useFormik } from "formik"
import * as Yup from "yup"
import { TextField, Button, Typography, Box, Card } from "@mui/material"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})

const ForgotPassword = () => {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      const auth = getAuth()
      try {
        await sendPasswordResetEmail(auth, values.email)
        setMessage("Password reset email has been sent.")
      } catch (error) {
        setError(error.message)
      }
    },
  })

  const goToLogin = () => {
    navigate("/")
  }
  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h4'
        sx={{
          padding: 2,
          color: "#FAA0A0",
        }}
      >
        Forgot Password
      </Typography>
      <Card
        sx={{
          maxWidth: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 5,
          border: "2px solid #FAA0A0",
          borderRadius: 5,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id='email'
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            sx={{ marginBottom: 2 }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: "#FAA0A0",
              color: "white",
              "&:hover": {
                backgroundColor: "#FAA0A0",
                color: "white",
              },
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Reset Password
          </Button>
        </form>
        <Button
          onClick={() => goToLogin()}
          type='submit'
          variant='contained'
          fullWidth
          sx={{
            backgroundColor: "#FAA0A0",
            color: "white",
            "&:hover": {
              backgroundColor: "#FAA0A0",
              color: "white",
            },
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Go Back
        </Button>
        {message && <Typography color='success'>{message}</Typography>}
        {error && <Typography color='error'>{error}</Typography>}
      </Card>
    </Box>
  )
}

export default ForgotPassword
