import React, { useRef } from "react"
import { useField, useFormikContext } from "formik"
import { Typography, Box, ListItemButton } from "@mui/material"
import { RemoveCircle } from "@mui/icons-material"

const FileUpload = ({ name, maxSize, ...props }) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    setFieldValue(name, e.target.files[0])
  }

  const handleRemoveClick = () => {
    setFieldValue(name, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: '40%',
        }}
      >
        <input
          ref={fileInputRef}
          id={name}
          name={name}
          type='file'
          onChange={handleFileChange}
          onBlur={field.onBlur}
          {...props}
        />
        {field.value && (
          <ListItemButton
            sx={{
              color: "#FAA0A0",
            }}
            onClick={handleRemoveClick}
          >
            <RemoveCircle />
          </ListItemButton>
        )}
      </Box>
      {meta.touched && meta.error && (
        <Typography variant='body2' sx={{ color: "red" }}>
          <br />
          {meta.error}
        </Typography>
      )}
    </Box>
  )
}

export default FileUpload
