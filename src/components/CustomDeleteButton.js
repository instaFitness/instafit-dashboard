import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { DeleteForever } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const CustomDeleteButton = ({ onDelete, confirmText }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    onDelete()
    handleClose()
  }

  return (
    <>
      <IconButton
        sx={{
          "&:hover": {
            color: "#FFF",
          },
        }}
        onClick={handleClickOpen}
      >
        <DeleteForever />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {confirmText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: "black"}}>
            Cancel
          </Button>
          <Button onClick={handleDelete} sx={{color: "#FAA0A0"}} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CustomDeleteButton
