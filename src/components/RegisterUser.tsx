import * as React from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import InputField from "./InputField";
import { Alert, Typography } from "@mui/material";
import BtnSubmit from "./BtnSubmit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { registerSchema } from "../schemas/registerSchema";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../features/user/action";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
  }

  const initialValues: FormData = {
    email: "",
    role: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zip_code: "",
    state: "",
    contact: "",
    country: "",
    dob: "",
    gender: Gender.Male,
    joining_date: "",
    pan_card: "",
    designation: "",
  };
  const {
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(action(values));
      setSubmitting(false);
    },
  });
  const selectedState = useSelector((state: RootState) => state.user);
  if (selectedState.user) {
    setTimeout(() => {
      // Navigate to "/user-list" after 2 seconds
      navigate("/user-list");
    }, 2000);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box className="RegistrationFrom">
        <Typography
          variant="h5"
          sx={{
            fontSize: "30px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Registration From
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <InputField
              label="Email"
              type="email"
              name="email"
              value={values.email}
              errors={errors}
              fullWidth
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <FormControl
              sx={{
                width: "46%",
              }}
            >
              <InputLabel id="select-role">Designation</InputLabel>
              <Select
                labelId="select-role"
                id="demo-simple-select"
                value={values.role}
                label="Designation"
                onChange={(event) =>
                  setFieldValue("role", event.target.value as string)
                }
              >
                <MenuItem value="superAdmin">superAdmin</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="hr">hr</MenuItem>
                <MenuItem value="associate">associate</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": { mb: 1 },
              justifyContent: "space-between",
            }}
          >
            <InputField
              label="First Name"
              type="test"
              name="first_name"
              value={values.first_name}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="Last Name"
              type="text"
              name="last_name"
              value={values.last_name}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": { mb: 1 },
              justifyContent: "space-between",
            }}
          >
            <InputField
              label="Address"
              type="text"
              name="address"
              value={values.address}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="City"
              type="text"
              name="city"
              value={values.city}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": { mb: 1 },
              justifyContent: "space-between",
            }}
          >
            <InputField
              label="Zip Code"
              type="text"
              name="zip_code"
              value={values.zip_code}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="State"
              type="text"
              name="state"
              value={values.state}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": { mb: 1 },
              justifyContent: "space-between",
            }}
          >
            <InputField
              label="Contact"
              type="text"
              name="contact"
              value={values.contact}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="Country"
              type="text"
              name="country"
              value={values.country}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <InputField
              label=" DOB"
              type="text"
              name="dob"
              value={values.dob}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />

            <RadioGroup
              row
              name="gender"
              sx={{}}
              value={values.gender} // Add this line to bind the selected value
              onChange={handleChange} // Add this line to handle changes
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": { mb: 1 },
              justifyContent: "space-between",
            }}
          >
            <InputField
              label="Joining Date"
              type="text"
              name="joining_date"
              value={values.joining_date}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="Pan Card"
              type="text"
              name="pan_card"
              value={values.pan_card}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
          </Box>
          <Box
            sx={{
              minWidth: 120,
              display: "flex",
              "& > :not(style)": { mt: 2 },
              justifyContent: "space-between",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.designation}
                label="Designation"
                onChange={(event) =>
                  setFieldValue("designation", event.target.value as string)
                }
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Team Lead">Team Lead</MenuItem>
                <MenuItem value="Senior">Software Engineer</MenuItem>
                <MenuItem value="Manager">Associate Engineer</MenuItem>
                <MenuItem value="Junior Software Engineer">
                  Junior Software Engineer
                </MenuItem>
                <MenuItem value="TraineeEngineer">Trainee Engineer</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <BtnSubmit btnName="Register" />
        </form>
        {selectedState.isError ? (
          <Alert
            variant="filled"
            severity="error"
            sx={{
              marginTop: 2,
            }}
          >
            {selectedState.errorMessage}
          </Alert>
        ) : (
          selectedState.user && (
            <Alert severity="success">Registered successfully</Alert>
          )
        )}
      </Box>
    </Box>
  );
}
