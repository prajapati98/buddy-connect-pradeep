import React, { useEffect, ChangeEvent } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Avatar,
  Button,
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
import AddFamilyFrom from "./AddFamilyFrom";
import FamilyList from "./FamilyList";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { UploadImage } from "../network/user";
import { styled } from "@mui/material/styles";
import { IMGURL } from "./PrefixUrl";

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
  interface ApiResponse {
    success: boolean;
    message: string;
    response: {
      id: string;
      user_id: string;
    };
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
  const [familyTableUpdate, setFamilyTableUpdate] = React.useState<number>(0);
  const [responseValue, setResponseValue] = React.useState<
    ApiResponse | undefined
  >();
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

  const handleFamilyUpdate = () => {
    // Increment the state to trigger a re-render and update the FamilyList component
    setFamilyTableUpdate((prev) => prev + 1);
  };
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (userId) {
        const files = event.target.files;
        if (files && files.length > 0) {
          const fileName = files[0].name;
          if (isFileValid(fileName)) {
            let formData = new FormData();
            formData.append("image", files[0]);

            const response = await UploadImage(formData, userId);
          } else {
            console.error(
              "Invalid file type. Please upload a JPG, JPEG, PNG, or GIF file."
            );
          }
        } else {
          console.error("No files selected");
        }
      } else {
        console.error("User ID is undefined");
      }
    } catch (error: any) {
      setResponseValue(error);
      console.error("An unknown error occurred:", error.message);
    }
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
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
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
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Avatar
            alt="avatar"
            src={`${IMGURL}${selectedUserData?.image || avatar}`}
            sx={{ width: 150, height: 150 }}
          />

          <Button
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
            component="label"
            variant="text"
            startIcon={
              <CameraAltIcon
                sx={{
                  zIndex: 1,
                  fontSize: "32px",
                  color: "#2196f3",
                  cursor: "pointer",
                  ":hover": { color: "#1769aa" },
                }}
              />
            }
            sx={{
              fontSize: "18px", // Adjust the font size of the button
              padding: "10px", // Adjust the padding of the button
              "& .MuiButton-startIcon > *:nth-of-type(1)": {
                fontSize: "32px", // Adjust the font size of the first child of startIcon
              },
            }}
          >
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileUpload}
              id="fileInput"
            />
          </Button>
        </Box>
        {responseValue !== undefined ? (
          <Box>
            <Alert
              severity="error"
              sx={{
                marginTop: 2,
              }}
            >
              {responseValue.message}
            </Alert>
          </Box>
        ) : (
          ""
        )}
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
            <AddFamilyFrom userId={userId} onSuccess={handleFamilyUpdate} />
            {/* Pass the familyTableUpdate state to FamilyList */}
            <FamilyList userId={userId} key={familyTableUpdate} />
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
