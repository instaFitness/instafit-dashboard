import * as Yup from "yup"

export const responseValidationSchema = Yup.object().shape({
  user: Yup.string().required("Required"),
  duration: Yup.date().required("Required"),
  training_procedure: Yup.string().required("Required"),
  training_url: Yup.array().min(1, "Please select at least one option"),
  target_body_parts: Yup.array().min(1, "Please select at least one option"),
  file: Yup.mixed()
    .required("Please select a file.")
    .test("fileSize", "File size should not exceed 2MB.", (value) => {
      const maxSize = 2 * 1024 * 1024 // 2 MB
      if (value) {
        return value.size <= maxSize
      }
      return true
    }),
  breakfast_name: Yup.string().required("Required"),
  breakfast_procedure: Yup.string().required("Required"),
  lunch_name: Yup.string().required("Required"),
  lunch_procedure: Yup.string().required("Required"),
  dinner_name: Yup.string().required("Required"),
  dinner_procedure: Yup.string().required("Required"),
})

export const editResponseValidationSchema = Yup.object().shape({
  user: Yup.string().required("Required"),
  duration: Yup.date().required("Required"),
  training_procedure: Yup.string().required("Required"),
  training_url: Yup.array().min(1, "Please select at least one option"),
  target_body_parts: Yup.array().min(1, "Please select at least one option"),
  file: Yup.mixed()
    .required("Please select a file.")
    .test("fileSize", "File size should not exceed 2MB.", (value) => {
      const maxSize = 2 * 1024 * 1024 // 2 MB
      if (value) {
        return value.size <= maxSize
      }
      return true
    }),
  breakfast_name: Yup.string().required("Required"),
  breakfast_procedure: Yup.string().required("Required"),
  lunch_name: Yup.string().required("Required"),
  lunch_procedure: Yup.string().required("Required"),
  dinner_name: Yup.string().required("Required"),
  dinner_procedure: Yup.string().required("Required"),
})
