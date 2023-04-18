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

const TrainingTable = ({
  searchText,
  trainings,
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
  const filteredData = trainings.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Trainer Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Training Type
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Target Body Parts
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Subscriptions
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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.trainer}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    {row.target_parts.map((part, i) => (
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
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      size='small'
                      sx={{
                        backgroundColor:
                          row.subscriptions === "free"
                            ? "#85C1E9"
                            : "#58D68D",
                        color: "#FFF",
                        marginRight: 2,
                        "&:hover": {
                          backgroundColor:
                            row.subscriptions === "free"
                              ? "#85C1E9"
                              : "#58D68D",
                          color: "#FFF",
                        },
                      }}
                    >
                      {row.subscriptions}
                    </Button>
                  </TableCell>
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

export default TrainingTable
