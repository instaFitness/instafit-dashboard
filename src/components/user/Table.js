import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material"
import { BorderColor } from "@mui/icons-material"
import CustomDeleteButton from "../CustomDeleteButton"

const CustomTable = ({
  searchText,
  users,
  handleDeleteUser,
  handleOpenEditModal,
  handleChangeStatus,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const filteredData = users.filter((row) =>
    row.email.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                First Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Last Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Subscriptions
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Role
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8837980",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleChangeStatus(row.id, row.subscriptions)
                      }
                      variant='contained'
                      size='small'
                      sx={{
                        backgroundColor:
                          row.subscriptions === "no" ? "#F1C40F" : "#58D68D",
                        color: "#FFF",
                        marginRight: 2,
                        "&:hover": {
                          backgroundColor:
                            row.subscriptions === "no" ? "#F1C40F" : "#58D68D",
                          color: "#FFF",
                        },
                      }}
                    >
                      {row.subscriptions}
                    </Button>
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenEditModal(row)}
                      sx={{
                        "&:hover": {
                          color: "#FFF",
                        },
                      }}
                    >
                      <BorderColor />
                    </IconButton>
                    <CustomDeleteButton
                      onDelete={() => handleDeleteUser(row.id)}
                      confirmText='Are you sure you want to delete this item?'
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default CustomTable
