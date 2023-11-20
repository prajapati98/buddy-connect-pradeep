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
import { Button } from "@mui/material";
import { DELETE_USER } from "../network/user";

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
}

// Assuming UserList is an array type
type UserList = UserListData[];

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.userList);
  useEffect(() => {
    dispatch(action());
  }, [dispatch]);

  const [userListData, setUserListData] = useState<UserListData[]>([]);
  const [userDelete, setUserDelete] = useState<string>();

  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.userList)) {
      // Update the type here
      const filteredUserList = (selectedState.userList as UserList).filter(
        (user) => user.id !== userDelete
      );

      setUserListData(filteredUserList);
    }
  }, [selectedState, userDelete]);

  const Deleteuser = (id: string) => {
    setUserDelete(id);
    DELETE_USER(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fullname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>View</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userListData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.designation}</TableCell>
              <TableCell>
                <Button variant="contained">View</Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="warning">
                  Update
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => Deleteuser(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
