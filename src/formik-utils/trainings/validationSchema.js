import * as Yup from "yup"

export const trainingValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  trainer: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  subscriptions: Yup.string().required("Required"),
  url: Yup.string().required("Required"),
  target_parts: Yup.array().min(1, "Please select at least one option"),
  workout_name: Yup.string().required("Required"),
  target_loose: Yup.string().required("Required"),
  general_procedure: Yup.string().required("Required"),
})

export const editTrainingValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  trainer: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  subscriptions: Yup.string().required("Required"),
  url: Yup.string().required("Required"),
  target_parts: Yup.array().min(1, "Please select at least one option"),
  name: Yup.string().required("Required"),
  trainer: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  workout_name: Yup.string().required("Required"),
  target_loose: Yup.string().required("Required"),
  general_procedure: Yup.string().required("Required"),
})
