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
import { action } from "../features/userList/action";
import { Link } from "react-router-dom";
import avatar from "../assets/image/avatar.jpg";

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { IMGURL } from "./PrefixUrl";

interface UserListData {
  profile: string;
  first_name: string;
  email: string;
  designation: string;
  View: string;
  Update: string;
  Delete: string;
  id: string;
  last_name: string;
  image: string;
  status: string;
}

const RecentUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.userList);
  useEffect(() => {
    dispatch(action());
  }, [dispatch]);

  const [userListData, setUserListData] = useState<UserListData[]>([]);

  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.userList)) {
      setUserListData(selectedState.userList);
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
        <Alert
          variant="filled"
          severity="error"
          sx={{
            marginTop: 2,
          }}
        >
          {selectedState.errorMessage}
        </Alert>
      </Box>
    );
  }
  if (selectedState.loading) {
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
      {userListData.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 1300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Active / Deactivate</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userListData.slice(0, 5).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Avatar"
                        src={row?.image ? `${IMGURL}${row.image}` : avatar}
                        sx={{ width: 50, height: 50 }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>{`${row.first_name} ${row.last_name} `}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>
                    {row.status === "active" ? (
                      <span style={{ color: "#4caf50" }}>Active</span>
                    ) : (
                      <span style={{ color: "#ff9800" }}>Deactive</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/UserInfoPage/${row.id}`}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default RecentUser;
