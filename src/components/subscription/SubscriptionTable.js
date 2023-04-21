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

const SubscriptionTable = ({
  searchText,
  subscription_items,
  handleDeleteRequest,
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
  const filteredData = subscription_items.filter((row) =>
    row.user.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAA0A0" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                User Subscribe
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Subscription Type
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Payment Type
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Amount
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
                    <TableCell>{row.user}</TableCell>
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
                    <TableCell>{row.payment_type}</TableCell>
                    <TableCell>{row.amount}</TableCell>
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

export default SubscriptionTable
