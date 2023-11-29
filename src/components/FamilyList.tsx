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
import { action } from "../features/getFamily/action";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import { DeleteFamilyMembers } from "../network/user";
enum Gender {
  Male = "male",
  Female = "female",
}
interface familyListData {
  id: string;
  name: string;
  address: string;
  contact: string;
  gender: Gender;
  relation: string;
  dob: string;
  message: string;
}

// Assuming UserList is an array type
type familyData = familyListData[];
interface FamilyListProps {
  userId: number | undefined;
}
const FamilyList: React.FC<FamilyListProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: RootState) => state.FamilyList);
  useEffect(() => {
    dispatch(action(userId));
  }, [dispatch, userId]);

  const [familyListData, setFamilyListData] = useState<familyListData[]>([]);

  const [memberDelete, setMemberDelete] = useState<number | undefined>();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDelete = (id: number) => {
    setDialogOpen(true);
    setMemberDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (memberDelete !== undefined) {
      try {
        const response = await DeleteFamilyMembers(userId, memberDelete);
        console.log(response);
      } catch (error: any) {
        console.log(error);
      }
      if (selectedState && Array.isArray(selectedState.FamilyList)) {
        const filteredUserList = (familyListData as familyData).filter(
          (user) => parseInt(user.id) !== memberDelete
        );
        setFamilyListData(filteredUserList);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  useEffect(() => {
    // Assuming selectedState contains an array of data
    if (selectedState && Array.isArray(selectedState.FamilyList)) {
      setFamilyListData(selectedState.FamilyList);
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
        <Typography>{selectedState.errorMessage}</Typography>
      </Box>
    );
  }
  if (familyListData.length === 0 && selectedState.loading) {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Relation</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {familyListData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{`${row.name}`}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.dob}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.relation}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(parseInt(row.id))}
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
  );
};

export default FamilyList;