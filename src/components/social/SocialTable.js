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
  Box,
} from "@mui/material"
import { RemoveRedEye } from "@mui/icons-material"
import CustomDeleteButton from "../CustomDeleteButton"

const SocialTable = ({
  searchText,
  socials,
  handleDeleteSocial,
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
  const filteredData = socials.filter((row) =>
    row.post_name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Image Uploaded
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Post Email
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Post Name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Date Posted
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
                    <TableCell>{row.post_email}</TableCell>
                    <TableCell>{row.post_name}</TableCell>
                    <TableCell>{row.post_date}</TableCell>
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
                      <CustomDeleteButton
                        onDelete={() => handleDeleteSocial(row.id, row.image_ref)}
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

export default SocialTable
