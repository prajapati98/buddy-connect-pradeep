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
  useEffect(() => {
    dispatch(action(userId));
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
      {salaryListData.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Home Rent Allowances</TableCell>
                <TableCell>Conveyance Allowance</TableCell>
                <TableCell>PF Amount</TableCell>
                <TableCell>ESIC Amount</TableCell>
                <TableCell>Income Tax</TableCell>
                <TableCell>PT Amount</TableCell>
                <TableCell>Loan</TableCell>
                <TableCell>Health Insurance</TableCell>
                <TableCell>Appraisal Date</TableCell>
                <TableCell>Utility Allowance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryListData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`${row.basic_salary}`}</TableCell>
                  <TableCell>{row.home_rent_allowances}</TableCell>
                  <TableCell>{row.conveyance_allowance}</TableCell>
                  <TableCell>{row.pf_amount}</TableCell>
                  <TableCell>{row.esic_amount}</TableCell>
                  <TableCell>{row.income_tax}</TableCell>
                  <TableCell>{row.pt_amount}</TableCell>
                  <TableCell>{row.loan}</TableCell>
                  <TableCell>{row.health_insurance}</TableCell>
                  <TableCell>{row.appraisal_date}</TableCell>
                  <TableCell>{row.utility_allowance}</TableCell>
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
