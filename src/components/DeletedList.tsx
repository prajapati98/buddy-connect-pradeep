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
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Alert, Box, CircularProgress, InputBase, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

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

// function createData(name: string, calories: number, fat: number) {
//   return { name, calories, fat };
// }

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
  last_name: string;
  gender: string;
  id: string;
  image: null | string;
  joining_date: string;
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
  const [search, setSearch] = React.useState("");

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   rowsPerPage -
  //   Math.min(rowsPerPage, deletedListData.length - page * rowsPerPage);

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
  useEffect(() => {
    if (selectedState && Array.isArray(selectedState.DeletedList)) {
      const filteredUserList = selectedState.DeletedList.filter(
        (user: { first_name?: string; last_name?: string }) => {
          const userName = user.first_name ? user.first_name.toLowerCase() : "";
          const userLastName = user.last_name
            ? user.last_name.toLowerCase()
            : "";
          const sanitizedSearch = search.toLowerCase().replace(/\s/g, "");

          return (
            userName.includes(sanitizedSearch.toLowerCase()) ||
            userLastName.includes(sanitizedSearch.toLowerCase())
          );
        }
      );

      setDeletedListData(filteredUserList);
    }
  }, [search, selectedState]);
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
          height: "calc(100vh - 67px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ mt: 10, mb: 2 }}>
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
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                S. NO.
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                Date of Birth
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                Gender
              </TableCell>
              {/* <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Role</TableCell> */}
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                Designation
              </TableCell>
              {/* <TableCell>Access Token</TableCell> */}
              <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                Joining Date
              </TableCell>
              {/* <TableCell>Pan Card </TableCell>
              <TableCell>Status </TableCell>
              <TableCell>Type User </TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {deletedListData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  {/* <TableCell>{row.city}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.zip_code}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.role}</TableCell> */}
                  <TableCell>{row.designation}</TableCell>
                  {/* <TableCell>{row.access_token}</TableCell> */}
                  <TableCell>{row.joining_date}</TableCell>
                  {/* <TableCell>{row.pan_card}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.type_user}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.updated_at}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter sx={{}}>
          <TableRow className="pradeep">
            <TablePagination
              rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={deletedListData.length}
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
      </TableContainer>
    </>
  );
};

export default DeletedList;
