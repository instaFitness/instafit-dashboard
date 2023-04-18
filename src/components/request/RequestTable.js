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
import { DeleteForever} from "@mui/icons-material"
import moment from "moment"

const RequestTable = ({
  searchText,
  request_plan,
  handleDeleteRequest,
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
  const filteredData = request_plan.filter((row) =>
    row.request_name.toLowerCase().includes(searchText.toLowerCase())
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
                Current Weight
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Target Weight Requested
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Date Requested
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
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{row.request_name}</TableCell>
                    <TableCell>{row.request_current_weight} kg</TableCell>
                    <TableCell>{row.request_target_weight} kg</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleChangeStatus(row.id, row.request_status)}
                        variant='contained'
                        size='small'
                        sx={{
                          backgroundColor: row.request_status === "Not Processed" ? "#F1C40F" : "#58D68D",
                          color: "#FFF",
                          marginRight: 2,
                          "&:hover": {
                            backgroundColor: row.request_status === "Not Processed" ? "#F1C40F" : "#58D68D",
                            color: "#FFF",
                          },
                        }}
                      >
                        {row.request_status}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {moment(row.request_date).format("MMMM D YYYY")}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteRequest(row.id)}
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

export default RequestTable