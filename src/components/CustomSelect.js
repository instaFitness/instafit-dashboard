import { TextField, MenuItem } from "@mui/material"
import { useFormikContext } from "formik"

const CustomSelect = ({ name, options, label }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext()

  const handleChange = (event) => {
    setFieldValue(name, event.target.value)
  }

  return (
    <TextField
      select
      fullWidth
      label={label}
      sx={{
        width: "49%",
        paddingBottom: 2,
      }}
      value={values[name] || ""}
      onChange={handleChange}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
      variant='outlined'
      size='small'
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default CustomSelect
