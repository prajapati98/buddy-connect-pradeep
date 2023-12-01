import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../features/getDeletedList/action";

import { Alert, Box, CircularProgress, Stack } from "@mui/material";

interface salaryListData {
  access_token: string;
  address: string;
  alternate_contact: null | string;
  city: string;
  contact: string;
  country: string;
  created_at: string;
  designation: string;
  dob: string;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  image: null | string;
  joining_date: string;
  last_name: string;
  pan_card: string;
  password: null | string;
  role: string;
  state: string;
  status: string;
  type_user: string;
  updated_at: string;
  zip_code: string;
}

const DeletedList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.DeletedList);
  useEffect(() => {
    dispatch(action());
  }, [dispatch]);
  const [deletedListData, setDeletedListData] = useState<salaryListData[]>([]);
  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.DeletedList)) {
      setDeletedListData(selectedState.DeletedList);
    }
  }, [selectedState]);
  if (selectedState.isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="outlined" severity="error">
            {selectedState.errorMessage}
          </Alert>
        </Stack>
      </Box>
    );
  }
  if (deletedListData.length === 0 && selectedState.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. NO.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Access Token</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Pan Card </TableCell>
              <TableCell>Status </TableCell>
              <TableCell>Type User </TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deletedListData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.zip_code}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.access_token}</TableCell>
                <TableCell>{row.joining_date}</TableCell>
                <TableCell>{row.pan_card}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.type_user}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DeletedList;
