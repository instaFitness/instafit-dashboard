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
import { BorderColor, DeleteForever, RemoveRedEye } from "@mui/icons-material"

const FitnessPlanTable = ({
  searchText,
  plans,
  handleDeleteUser,
  handleOpenEditModal,
  handleOpenViewModal,
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
  const filteredData = plans.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Workout Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Calorie Burn
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Intensity
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Target Body Parts
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f8837980",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.target_weight}</TableCell>
                    <TableCell>{row.intensity}</TableCell>
                    <TableCell>
                      {row.target_body.map((part, i) => {
                        return (
                          <Button
                            variant='contained'
                            size='small'
                            sx={{
                              backgroundColor: "#FAA0A0",
                              color: "#FFF",
                              marginRight: 2,
                              "&:hover": {
                                backgroundColor: "#FAA0A0",
                                color: "#FFF",
                              },
                            }}
                            key={i}
                          >
                            {part}
                          </Button>
                        )
                      })}
                    </TableCell>
                    {/* <TableCell>{row.description}</TableCell> */}
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenViewModal(row)}
                        sx={{
                          "&:hover": {
                            color: "#FFF",
                          },
                        }}
                      >
                        <RemoveRedEye />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenEditModal(row.id)}
                        sx={{
                          "&:hover": {
                            color: "#FFF",
                          },
                        }}
                      >
                        <BorderColor />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteUser(row.id)}
                        sx={{
                          "&:hover": {
                            color: "#FFF",
                          },
                        }}
                      >
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
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

export default FitnessPlanTable
