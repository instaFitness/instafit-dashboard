import * as Yup from "yup"

export const forgotValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})
