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
import { action } from "../features/getBankDetails/action";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  Stack,
  Switch,
} from "@mui/material";
import { deleteBankDetails, setPrimaryAccount } from "../network/user";
enum typeAccount {
  primary = "primary",
  secondary = "secondary",
}
interface bankListData {
  account_number: string;
  bank_name: string;
  bank_branch: string;
  ifsc_code: string;
  micr_code: string;
  cif_code: string;
  type_account: typeAccount;
  address: string;
  id: string;
}

// Assuming UserList is an array type
type bankData = bankListData[];
interface BankListProps {
  userId: number | undefined;
}
const BankDetailsList: React.FC<BankListProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.BankList);
  const [loading, setLoading] = useState(false);
  const [currentBankId, setCurrentBankId] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

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

  const [bankListData, setBankListData] = useState<bankListData[]>([]);
  const [error, setError] = useState<string>("");

  const [deleteId, setDeleteId] = useState<number | undefined>();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDelete = (id: number) => {
    setDialogOpen(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== undefined) {
      try {
        const response = await deleteBankDetails(userId, deleteId);
        if (
          response.data.success &&
          selectedState &&
          Array.isArray(selectedState.BankList)
        ) {
          const filteredUserList = (bankListData as bankData).filter(
            (user) => parseInt(user.id) !== deleteId
          );
          setBankListData(filteredUserList);
          setError("");
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.BankList)) {
      setBankListData(selectedState.BankList);
    }
  }, [selectedState, userId]);

  const handleSetAccountChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    bankId: string
  ) => {
    setCurrentBankId(bankId);
    setBtnDisable(true);
    const newType: typeAccount = event.target.checked
      ? ("primary" as typeAccount)
      : ("secondary" as typeAccount);
    try {
      const response = await setPrimaryAccount(userId, bankId, {
        type_account: newType,
      });
      if (response.status === 200) {
        setBtnDisable(false);
        setError("");
        setBankListData((prevBankListData) => {
          return prevBankListData.map((bankDetails) =>
            bankDetails.id === bankId
              ? { ...bankDetails, type_account: newType }
              : { ...bankDetails, type_account: typeAccount.secondary }
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
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        </Stack>
      ) : (
        ""
      )}
      {bankListData.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 1300, overflowX: "scroll" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Bank Name</TableCell>
                <TableCell>Bank Branch</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>IFC Code</TableCell>
                <TableCell>MICR Code</TableCell>
                <TableCell>CIF Code</TableCell>
                <TableCell>Type Account</TableCell>
                <TableCell> Set Primary</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankListData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`${row.bank_name}`}</TableCell>
                  <TableCell>{row.bank_branch}</TableCell>
                  <TableCell>{row.account_number}</TableCell>
                  <TableCell>{row.ifsc_code}</TableCell>
                  <TableCell>{row.micr_code}</TableCell>
                  <TableCell>{row.cif_code}</TableCell>
                  <TableCell>{row.type_account}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Radio
                          sx={{ m: 1 }}
                          inputProps={{ "aria-label": "controlled" }}
                          checked={row.type_account === "primary"}
                          onChange={(event) =>
                            handleSetAccountChange(event, row.id)
                          }
                          id={row.id}
                        />
                      }
                      label="Set as primary"
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(parseInt(row.id))}
                      disabled={btnDisable && currentBankId === row.id}
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
                  Are you sure you want to delete this Member?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" onClick={handleConfirmDelete}>
                  DELETE
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default BankDetailsList;
