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
  Box,
} from "@mui/material"
import { BorderColor, RemoveRedEye } from "@mui/icons-material"
import CustomDeleteButton from "../../CustomDeleteButton"

const MealPlanTable = ({
  searchText,
  mealPlan,
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
  const filteredData = mealPlan.filter((row) =>
    row.meal_plan.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Meal Image
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Meal Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Calories Count
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Meal Category
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Meal Type
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Subscription Type
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
                    <TableCell>
                      <Box>
                        <img
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                          src={
                            row.image_url !== "null"
                              ? row.image_url
                              : "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
                          }
                          alt='Meal'
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{row.meal_plan}</TableCell>
                    <TableCell>{row.calories_count}</TableCell>
                    <TableCell>{row.meal_time}</TableCell>
                    <TableCell>
                      {row.meal_type.map((meal, i) => (
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
                          {meal}
                        </Button>
                      ))}
                    </TableCell>
                    <TableCell>
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
                      >
                        {row.subscription_type}
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
                        onDelete={() => handleDeleteUser(row.id, row.image_ref)}
                        confirmText='Are you sure you want to delete this item?'
                      />
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

export default MealPlanTable
