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

import { Alert, Box, CircularProgress, Stack } from "@mui/material";

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
const SalaryDetailsList: React.FC<salaryListProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.SalaryList);
  const [loading, setLoading] = useState(false);

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
                  {/* <TableCell>{row.utility_allowance}</TableCell> */}
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

export default SalaryDetailsList;
