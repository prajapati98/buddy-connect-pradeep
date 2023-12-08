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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { IMGURL } from "./PrefixUrl";
import InputBase from "@mui/material/InputBase";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MenuItem from "@mui/material/MenuItem";

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
// pagination
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
// pagination

// Assuming UserList is an array type
type UserData = UserListData[];

const UserList = () => {
  const [error, setError] = React.useState("");
  const [userListData, setUserListData] = useState<UserListData[]>([]);
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    dispatch(action());
  }, [dispatch]);

  const [userDelete, setUserDelete] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [role, setRole] = useState("");

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    setBtnDisable(true);
    setCurrentUserId(userId);
    const newStatus: string = event.target.checked ? "active" : "deActive";
    try {
      const response = await updateUserStatus(userId, {
        status: newStatus,
      });
      if (response.status === 200) {
        setError("");
        setBtnDisable(false);
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
      setBtnDisable(false);
    }
  };

  useEffect(() => {
    if (selectedState && Array.isArray(selectedState.userList)) {
      const filteredUserList = selectedState.userList.filter((user) => {
        const userName = user.first_name ? user.first_name.toLowerCase() : "";
        const userLastName = user.last_name ? user.last_name.toLowerCase() : "";
        const sanitizedSearch = search.toLowerCase().replace(/\s/g, "");

        return (
          userName.includes(sanitizedSearch.toLowerCase()) ||
          userLastName.includes(sanitizedSearch.toLowerCase())
        );
      });

      setUserListData(filteredUserList);
    }
  }, [search]);

  useEffect(() => {
    if (selectedState && Array.isArray(selectedState.userList)) {
      const filteredUserList = selectedState.userList.filter((user) => {
        const userRole = user.role ? user.role.toLowerCase() : "";

        return userRole.includes(role.toLowerCase());
      });

      setUserListData(filteredUserList);
    }
  }, [role]);

  const roleOptions = [
    { value: "superAdmin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "hr", label: "HR" },
    { value: "associate", label: "Associate" },
  ];

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
          height: "calc( 100vh - 67px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={{
          mt: 10,
          mb: 4,
          display: "flex",
          alignItems: "content",
          justifyContent: "space-between",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            boxShadow: "none",
            border: "2px solid #1976d2",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by Name"
            value={search}
            inputProps={{ "aria-label": "Search by Name" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            {search ? (
              <CancelIcon onClick={() => setSearch("")} />
            ) : (
              <SearchIcon />
            )}
          </IconButton>
        </Paper>
        <Box>
          <FormControl
            sx={{
              width: "300px",
              mr: 2,
              boxShadow: "none",
            }}
          >
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role-select"
              name="role"
              value={role}
              label="Relation"
              onChange={(event) => setRole(event.target.value)}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Link to={"/register-user"}>
            <Button
              variant="contained"
              sx={{
                fontSize: "18px",
              }}
              endIcon={<PersonAddAltIcon style={{ fontSize: 40 }} />}
            >
              Create User
            </Button>
          </Link>
        </Box>
      </Box>
      {userListData.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1300 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#1976d2",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Profile
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Full Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Designation
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Active / Deactivate
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  View
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Update
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userListData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
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
                        <Button
                          variant="contained"
                          disabled={btnDisable && row.id === currentUserId}
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/UserUpdate/${row.id}`}>
                        <Button
                          variant="contained"
                          color="warning"
                          disabled={btnDisable && row.id === currentUserId}
                          startIcon={<EditIcon />}
                        >
                          Update
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        disabled={btnDisable && row.id === currentUserId}
                        onClick={() => handleDelete(row.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TableFooter sx={{}}>
            <TableRow className="pradeep">
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                colSpan={3}
                count={userListData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
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

            {error ? (
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  marginTop: 2,
                }}
              >
                {error}
              </Alert>
            ) : (
              ""
            )}
          </Box>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default UserList;
