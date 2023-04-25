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
import { BorderColor, RemoveRedEye } from "@mui/icons-material"
import CustomDeleteButton from "../CustomDeleteButton"

const ResponseTable = ({
  searchText,
  responseList,
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
  const filteredData = responseList.filter((row) =>
    row.user.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                User
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Body Parts
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Actions6
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
                  <TableCell>{row.user}</TableCell>
                  <TableCell>
                    {row.target_body_parts.length > 0 &&
                      row.target_body_parts.map((part, i) => (
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
                      onDelete={() => handleDeleteUser(row.id, row.img_ref)}
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

export default ResponseTable
