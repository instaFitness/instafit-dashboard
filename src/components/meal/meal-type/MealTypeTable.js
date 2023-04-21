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
} from "@mui/material"
import { BorderColor, RemoveRedEye } from "@mui/icons-material"
import CustomDeleteButton from "../../CustomDeleteButton"

const MealTypeTable = ({
  searchText,
  mealType,
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
  const filteredData = mealType.filter((row) =>
    row.meal.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Meal
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Description
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
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.meal}</TableCell>
                  <TableCell>{row.description.length > 30 ? `${row.description.substring(0, 50)}...` : row.description}</TableCell>
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
                      onDelete={() => handleDeleteUser(row.id)}
                      confirmText="Are you sure you want to delete this item?"
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

export default MealTypeTable
