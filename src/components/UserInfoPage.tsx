import React, { useEffect } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { action as singleUser } from "../features/ singleUser /action";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/image/avatar.jpg";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const UserInfoPage: React.FC = () => {
  enum Gender {
    Male = "male",
    Female = "female",
  }
  interface FormData {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    zip_code: string;
    state: string;
    contact: string;
    country: string;
    dob: string;
    gender: Gender;
    joining_date: string;
    pan_card: string;
    designation: string;
    email: string;
    role: string;
    status: string;
    image: string;
    message: string;
  }
  const [selectedUserData, setSelectedUserData] =
    React.useState<FormData | null>(null);
  const { id } = useParams();
  const userId = id ? parseInt(id) : undefined;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId !== undefined) {
      dispatch(singleUser(userId));
    }
  }, [userId, dispatch]);

  const selectedState = useSelector((state: RootState) => state.singleUserData);
  const [value, setValue] = React.useState("Personal");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Handle the case where it's an array or null
    setSelectedUserData(
      Array.isArray(selectedState.singleUserData)
        ? null // Handle array case if needed, or ignore it
        : (selectedState.singleUserData as unknown as FormData)
    );
  }, [selectedState.singleUserData]);
  if (selectedState.loading && selectedUserData === null) {
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
  if (selectedState.isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
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
  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={`${selectedUserData?.image || avatar}`}
          sx={{ width: 150, height: 150 }}
        />
        <Typography
          style={{
            marginBottom: 10,
            marginTop: 15,
          }}
        >{`${selectedUserData?.first_name} ${selectedUserData?.last_name}`}</Typography>
        <Typography>{`${selectedUserData?.designation}`}</Typography>
      </Stack>
      <Box sx={{ width: "80%", typography: "body1", margin: "auto" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ justifyContent: "center" }} // Align center
            >
              <Tab label="Personal Information" value="Personal" />
              <Tab label="Family Information" value="Family" />
              <Tab label="Bank Detail" value="Bank" />
              <Tab label="Salary" value="Salary" />
            </TabList>
          </Box>
          <TabPanel value="Personal">
            {/* Content for Personal Information tab */}
            <Typography variant="h5" gutterBottom>
              User Information
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Email : </strong>
              {selectedUserData?.email}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Contact : </strong>
              {selectedUserData?.contact}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Address : </strong>
              {selectedUserData?.address}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Gender : </strong>
              {selectedUserData?.gender}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Designation : </strong>
              {selectedUserData?.designation}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Status : </strong> {selectedUserData?.status}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginBottom: 1 }}
            >
              <strong>Joining Date : </strong>
              {selectedUserData?.joining_date}
            </Typography>
          </TabPanel>
          <TabPanel value="Family">
            {/* Content for Family Information tab */}
            Item Two
          </TabPanel>
          <TabPanel value="Bank">
            {/* Content for Bank Detail tab */}
            Item Three
          </TabPanel>
          <TabPanel value="Salary">
            {/* Content for Salary tab */}
            Item Four
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default UserInfoPage;
