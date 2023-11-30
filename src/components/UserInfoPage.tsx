import React, { useEffect, ChangeEvent, useRef } from "react";
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
import AddBankDetailsForm from "./AddBankDetailsForm";
import BankDetailsList from "./BankDetailsList";
import AddSalaryDetailsForm from "./AddSalaryDetailsForm";
import SalaryDetailsList from "./SalaryDetailsList";

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
  interface ErrorResponse {
    error: {
      message: string;
    };
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [selectedUserData, setSelectedUserData] =
    React.useState<FormData | null>(null);
  const { id } = useParams();
  const userId = id ? parseInt(id) : undefined;
  const dispatch = useDispatch<AppDispatch>();

  const selectedState = useSelector((state: RootState) => state.singleUserData);
  const [value, setValue] = React.useState("Personal");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [tableUpdate, setTableUpdate] = React.useState<number>(0);
  const [responseValue, setResponseValue] = React.useState<
    ApiResponse | ErrorResponse | undefined
  >();

  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  function isFileValid(filename: string) {
    const fileParts = filename.split(".");

    if (fileParts.length > 1) {
      const fileExtension = fileParts.pop()!.toLowerCase();
      return allowedExtensions.includes(fileExtension);
    }
    return false;
  }

  const handleUpdate = () => {
    setTableUpdate((prev) => prev + 1);
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
            if (response.data.success) {
              setSelectedUserData((prevUserData) => ({
                ...(prevUserData as FormData),
                image: response.data.response,
              }));

              setResponseValue(undefined);
            }
          } else {
            setResponseValue({
              error: {
                message:
                  "Invalid file type. Please upload a JPG, JPEG, PNG, or GIF file.",
              },
            });
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
    if (userId !== undefined) {
      dispatch(singleUser(userId));
    }
  }, [userId, dispatch]);
  useEffect(() => {
    setSelectedUserData(
      Array.isArray(selectedState.singleUserData)
        ? null
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
            sx={{
              width: 150,
              height: 150,
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
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
              ref={fileInputRef}
            />
          </Button>
        </Box>
        {responseValue !== undefined ? (
          "error" in responseValue ? (
            <Box>
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {(responseValue as ErrorResponse).error.message}
              </span>
            </Box>
          ) : (
            <Box>
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "absolute",
                }}
              >
                {(responseValue as ApiResponse).message}
              </span>
            </Box>
          )
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
      <Box sx={{ typography: "body1", margin: "auto" }}>
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
            <AddFamilyFrom userId={userId} onSuccess={handleUpdate} />
            {/* Pass the familyTableUpdate state to FamilyList */}
            <FamilyList userId={userId} key={tableUpdate} />
          </TabPanel>
          <TabPanel value="Bank">
            <AddBankDetailsForm userId={userId} onSuccess={handleUpdate} />
            <BankDetailsList userId={userId} key={tableUpdate} />
          </TabPanel>
          <TabPanel value="Salary">
            <AddSalaryDetailsForm userId={userId} onSuccess={handleUpdate} />
            <SalaryDetailsList userId={userId} key={tableUpdate} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default UserInfoPage;
