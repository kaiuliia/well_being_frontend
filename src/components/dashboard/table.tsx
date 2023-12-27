import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

const rows = [
  "General mood",
  "Ice cream sandwich",
  "Eclair",
  "Cupcake",
  "Gingerbread",
];

export default function DashboardTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        // sx={{ minWidth: "100%" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">M</TableCell>
            <TableCell align="center">T</TableCell>
            <TableCell align="center">W</TableCell>
            <TableCell align="center">T</TableCell>
            <TableCell align="center">F</TableCell>
            <TableCell align="center">S</TableCell>
            <TableCell align="center">S</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "green",
                  }}
                ></Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "green",
                  }}
                ></Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "green",
                  }}
                ></Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "green",
                  }}
                ></Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
