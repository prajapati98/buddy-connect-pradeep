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
import { action } from "../features/getSalary/action";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Alert, Box, Button, CircularProgress, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

interface salaryListData {
  id: string;
  basic_salary: string;
  home_rent_allowances: string;
  conveyance_allowance: string;
  pf_amount: string;
  esic_amount: string;
  income_tax: string;
  pt_amount: string;
  loan: string;
  health_insurance: string;
  appraisal_date: string;
  utility_allowance: string;
}
interface salaryListProps {
  userId: number | undefined;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const SalaryDetailsList: React.FC<salaryListProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.SalaryList);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(action(userId));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, userId]);
  const [salaryListData, setSalaryListData] = useState<salaryListData[]>([]);
  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.SalaryList)) {
      setSalaryListData(selectedState.SalaryList);
    }
  }, [selectedState]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  if (loading) {
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
      {salaryListData.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1300 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#1976d2",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Basic Salary
                </TableCell>
                {/* <TableCell>Home Rent Allowances</TableCell> */}
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Conveyance Allowance
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  PF Amount
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  ESIC Amount
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Income Tax
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  PT Amount
                </TableCell>
                {/* <TableCell>Loan</TableCell> */}
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Health Insurance
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  Appraisal Date
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "18px" }}>
                  View More Details
                </TableCell>
                {/* <TableCell>Utility Allowance</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryListData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`${row.basic_salary}`}</TableCell>
                  {/* <TableCell>{row.home_rent_allowances}</TableCell> */}
                  <TableCell>{row.conveyance_allowance}</TableCell>
                  <TableCell>{row.pf_amount}</TableCell>
                  <TableCell>{row.esic_amount}</TableCell>
                  <TableCell>{row.income_tax}</TableCell>
                  <TableCell>{row.pt_amount}</TableCell>
                  {/* <TableCell>{row.loan}</TableCell> */}
                  <TableCell>{row.health_insurance}</TableCell>
                  <TableCell>{row.appraisal_date}</TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      variant="contained"
                      endIcon={<RemoveRedEyeIcon />}
                      onClick={handleClickOpen}
                    >
                      View
                    </Button>
                  </TableCell>
                  {/* <TableCell>{row.utility_allowance}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Modal title
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </Typography>
              <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </Typography>
              <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default SalaryDetailsList;
