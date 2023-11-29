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
import { deleteUser, updateUserStatus } from "../network/user";
import { Link } from "react-router-dom";
import avatar from "../assets/image/avatar.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
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

// Assuming UserList is an array type
type UserData = UserListData[];

const UserList = () => {
  const [error, setError] = React.useState("");

  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.userList);
  useEffect(() => {
    dispatch(action());
  }, [dispatch]);

  const [userListData, setUserListData] = useState<UserListData[]>([]);
  const [userDelete, setUserDelete] = useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.userList)) {
      setUserListData(selectedState.userList);
    }
  }, [selectedState, userDelete]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDelete = (id: string) => {
    setDialogOpen(true);
    setUserDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (userDelete !== "") {
      try {
        const response = await deleteUser(userDelete);
        if (response.status === 200) {
          setError("");
        }
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
      if (selectedState && Array.isArray(selectedState.userList)) {
        const filteredUserList = (selectedState.userList as UserData).filter(
          (user) => user.id !== userDelete
        );
        setUserListData(filteredUserList);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: string,
    currentStatus: string
  ) => {
    setLoading(true);
    const newStatus: string = event.target.checked ? "active" : "deActive";
    try {
      const response = await updateUserStatus(newStatus, userId);
      if (response.status === 200) {
        setError("");
        setLoading(false);
        setUserListData((prevUserListData) => {
          return prevUserListData.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          );
        });
      }
    } catch (error: any) {
      setError(error.message);
      console.log("update user Status", error);
    } finally {
      setLoading(false);
    }
  };

  if (userListData.length === 0 && selectedState.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Active / Deactivate</TableCell>
            <TableCell>View</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userListData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    alt="Avatar"
                    src={`${IMGURL}${row?.image || avatar}`}
                    sx={{ width: 50, height: 50 }}
                  />
                </Stack>
              </TableCell>
              <TableCell>{`${row.first_name} ${row.last_name} `}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.designation}</TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch
                      sx={{ m: 1 }}
                      inputProps={{ "aria-label": "controlled" }}
                      checked={row.status === "active"}
                      onChange={(event) =>
                        handleSwitchChange(event, row.id, row.status)
                      }
                      id={row.id}
                    />
                  }
                  label=""
                />
              </TableCell>
              <TableCell>
                <Link to={`/UserInfoPage/${row.id}`}>
                  <Button variant="contained" disabled={loading}>
                    View
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/UserUpdate/${row.id}`}>
                  <Button
                    variant="contained"
                    color="warning"
                    disabled={loading}
                  >
                    Update
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  disabled={loading}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box>
        <Dialog open={dialogOpen} onClose={handleClose} maxWidth="xs">
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </TableContainer>
  );
};

export default UserList;
