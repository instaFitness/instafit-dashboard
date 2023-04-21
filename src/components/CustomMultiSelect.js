import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  FormHelperText,
} from "@mui/material"
import { useFormikContext } from "formik"

const CustomMultiSelect = ({ name, options, label }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext()

  const handleChange = (event) => {
    setFieldValue(name, event.target.value)
  }

  return (
    <FormControl
      fullWidth
      variant='outlined'
      sx={{
        width: "49%",
        paddingBottom: 2,
      }}
      size='small'
      error={touched[name] && Boolean(errors[name])}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        value={values[name] || []}
        onChange={handleChange}
        renderValue={(selected) => (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selected.map((value) => {
              const option = options.find((option) => option.value === value)
              if (!option) {
                return null;
              }
              return (
                <Chip
                  key={value}
                  label={option.label}
                  style={{ margin: "0 2px 2px 0" }}
                />
              )
            })}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  )
}

export default CustomMultiSelect
