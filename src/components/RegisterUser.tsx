import * as React from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import InputField from "./InputField";
import { Typography } from "@mui/material";
import BtnSubmit from "./BtnSubmit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { registerSchema } from "../schemas/registerSchema";

export default function RegisterUser() {
  enum Gender {
    Male = "male",
    Female = "female",
  }
  interface FormData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    contact: string;
    country: string;
    dob: string;
    gender: Gender;
    joiningDate: string;
    panCard: string;
    designation: string;
  }

  const initialValues: FormData = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    contact: "",
    country: "",
    dob: "",
    gender: Gender.Male,
    joiningDate: "",
    panCard: "",
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
      console.log(values);
    },
  });
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box className="RegistrationFrom">
        <Typography
          variant="h5"
          sx={{
            fontSize: "30px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Registration From
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
              name="firstName"
              value={values.firstName}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={values.lastName}
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
              name="zipCode"
              value={values.zipCode}
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
              sx={{
                ml: 5.9,
              }}
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
              name="joiningDate"
              value={values.joiningDate}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
            />
            <InputField
              label="Pan Card"
              type="text"
              name="panCard"
              value={values.panCard}
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
                <MenuItem value="Junior Software Engineer">Junior Software Engineer</MenuItem>
                <MenuItem value="TraineeEngineer">Trainee Engineer</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <BtnSubmit btnName="Register" />
        </form>
      </Box>
    </Box>
  );
}
