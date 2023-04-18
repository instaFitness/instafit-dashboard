import React, { useEffect, useState } from "react"
import { Snackbar, Alert } from "@mui/material"

function NotificationPopup({ open, onClose, severity, message }) {
  const [autoHideDuration, setAutoHideDuration] = useState(null)

//   useEffect(() => {
//     if (severity === "success") {
//       setAutoHideDuration(5000)
//     } else if (severity === "info") {
//       setAutoHideDuration(5000)
//     } else if (severity === "error") {
//       setAutoHideDuration(5000)
//     } else {
//       setAutoHideDuration(null)
//     }
//   }, [severity])

//   useEffect(() => {
//     let timeout;
//     if (open && autoHideDuration) {
//       timeout = setTimeout(() => {
//         onClose();
//       }, autoHideDuration);
//     }
//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [open, autoHideDuration, onClose]);

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default NotificationPopup
