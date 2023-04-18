import React from "react"
import { useField } from "formik"
import { TextField } from "@mui/material"

const CustomTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={Boolean(errorText)}
      helperText={errorText}
      sx={{ width: "100%", marginBottom: 2, }}
      multiline
      rows={3}
      variant='outlined'
    />
  )
}

export default CustomTextArea
