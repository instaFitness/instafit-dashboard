import React from "react"
import { TextField } from "@mui/material"
import { useFormikContext } from "formik"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

const CustomDateInput = ({ name, label, inputFormat, ...props }) => {
  const { setFieldValue, setFieldError, errors, touched } = useFormikContext()
  const currentError = errors[name]
  const isTouched = touched[name]

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        {...props}
        label={label}
        value={props.value}
        sx={{ width: "49%", marginBottom: 2, }}
        inputFormat={inputFormat}
        onChange={(value) => setFieldValue(name, value)}
        onError={(error) => setFieldError(name, error)}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!currentError && isTouched}
            helperText={isTouched ? currentError : ""}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default CustomDateInput
