import * as Yup from "yup"

export const bodyPartValidationSchema = Yup.object().shape({
  body: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

export const editBodyPartValidationSchema = Yup.object().shape({
  body: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

export const fitnessPlanValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  target_lose: Yup.number().required("Required"),
  intensity: Yup.string().required("Required"),
  target_body: Yup.array().min(1, "Please select at least one option"),
  description: Yup.string().required("Required"),
  procedure: Yup.string().required("Required"),
})

export const editFitnessPlanValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  target_lose: Yup.number().required("Required"),
  intensity: Yup.string().required("Required"),
  target_body: Yup.array().min(1, "Please select at least one option"),
  description: Yup.string().required("Required"),
  procedure: Yup.string().required("Required"),
})

