import * as Yup from "yup"

export const mealTypeValidationSchema = Yup.object().shape({
  meal: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

export const editMealTypeValidationSchema = Yup.object().shape({
  meal: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

export const mealPlanValidationSchema = Yup.object().shape({
  meal_plan: Yup.string().required("Required"),
  calories_count: Yup.number().required("Required"),
  meal_time: Yup.string().required("Required"),
  meal_type: Yup.array().min(1, "Please select at least one option"),
  description: Yup.string().required("Required"),
  file: Yup.mixed()
    .required("Please select a file.")
    .test("fileSize", "File size should not exceed 2MB.", (value) => {
      const maxSize = 2 * 1024 * 1024 // 2 MB
      if (value) {
        return value.size <= maxSize
      }
      return true
    }),
  subscription_type: Yup.string().required("Required"),
})

export const editMealPlanValidationSchema = Yup.object().shape({
  meal_plan: Yup.string().required("Required"),
  calories_count: Yup.number().required("Required"),
  meal_time: Yup.string().required("Required"),
  meal_type: Yup.array().min(1, "Please select at least one option"),
  description: Yup.string().required("Required"),
  file: Yup.mixed()
    .required("Please select a file.")
    .test("fileSize", "File size should not exceed 2MB.", (value) => {
      const maxSize = 2 * 1024 * 1024 // 2 MB
      if (value) {
        return value.size <= maxSize
      }
      return true
    }),
  subscription_type: Yup.string().required("Required"),
})
