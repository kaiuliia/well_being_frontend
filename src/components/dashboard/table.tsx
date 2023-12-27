import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
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

// const rows = [
//   "General mood",
//   "Ice cream sandwich",
//   "Eclair",
//   "Cupcake",
//   "Gingerbread",
// ];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export default function DashboardTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
  // <TableContainer component={Paper}>
  //   <Table
  //     // sx={{ minWidth: "100%" }}
  //     aria-label="simple table"
  //   >
  //     <TableHead>
  //       <TableRow>
  //         <TableCell></TableCell>
  //         <TableCell align="center">M</TableCell>
  //         <TableCell align="center">T</TableCell>
  //         <TableCell align="center">W</TableCell>
  //         <TableCell align="center">T</TableCell>
  //         <TableCell align="center">F</TableCell>
  //         <TableCell align="center">S</TableCell>
  //         <TableCell align="center">S</TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {rows.map((row) => (
  //         <TableRow
  //           key={row}
  //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //         >
  //           <TableCell component="th" scope="row">
  //             {row}
  //           </TableCell>
  //           <TableCell align="right">
  //             <Box
  //               sx={{
  //                 width: "1rem",
  //                 height: "1rem",
  //                 backgroundColor: "green",
  //               }}
  //             ></Box>
  //           </TableCell>
  //           <TableCell align="center">
  //             <Box
  //               sx={{
  //                 width: "1rem",
  //                 height: "1rem",
  //                 backgroundColor: "green",
  //               }}
  //             ></Box>
  //           </TableCell>
  //           <TableCell align="center">
  //             <Box
  //               sx={{
  //                 width: "1rem",
  //                 height: "1rem",
  //                 backgroundColor: "green",
  //               }}
  //             ></Box>
  //           </TableCell>
  //           <TableCell align="center">
  //             <Box
  //               sx={{
  //                 width: "1rem",
  //                 height: "1rem",
  //                 backgroundColor: "green",
  //               }}
  //             ></Box>
  //           </TableCell>
  //           <TableCell align="center">
  //             <Box
  //               sx={{
  //                 width: "1rem",
  //                 height: "1rem",
  //                 backgroundColor: "green",
  //               }}
  //             ></Box>
  //           </TableCell>
  //           <TableCell align="center">
  //             <Box
  //               sx={{
  //                 width: "1rem",
  //                 height: "1rem",
  //                 backgroundColor: "green",
  //               }}
  //             ></Box>
  //           </TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // </TableContainer>
}
