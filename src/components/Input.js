import { useState } from "react"
import { Field, ErrorMessage } from "formik"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { VisibilityOff, Visibility } from "@mui/icons-material"

const CustomTextField = ({ label, name, type }) => {
  console.log("type", type)
  const [show, setUnShow] = useState(false)
  const handleClickShowPassword = () => {
    setUnShow(!show)
  }

  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <TextField
          {...field}
          type={inputType}
          label={label}
          size='small'
          variant='outlined'
          error={form.touched[name] && Boolean(form.errors[name])}
          helperText={<ErrorMessage name={name} />}
          sx={{
            width: "49%",
            paddingBottom: 2,
            "& label": {
              color:
                form.touched[name] && Boolean(form.errors[name])
                  ? "red"
                  : "initial",
            },
            "& .MuiOutlinedInput-root": {
              borderColor:
                form.touched[name] && Boolean(form.errors[name])
                  ? "red"
                  : "initial",
            },
          }}
          InputProps={{
            endAdornment: (
              <>
                {type === "password" && (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
              </>
            ),
          }}
        />
      )}
    </Field>
  )
}

export default CustomTextField
