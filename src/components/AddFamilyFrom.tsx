import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import InputField from "./InputField";
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import BtnSubmit from "./BtnSubmit";
import { familyRegisterSchema } from "../schemas/familyRegisterSchema";
enum Gender {
  Male = "male",
  Female = "female",
}

export interface FormData {
  name: string;
  relation: string;
  contact: string;
  dob: string;
  gender: Gender.Male;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
interface AddFamilyFormProps {
  userId: number | undefined;
}
const AddFamilyFrom: React.FC<AddFamilyFormProps> = ({ userId }) => {
  const [open, setOpen] = React.useState(false);
  const relationOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "brother", label: "Senior Software Engineer" },
    { value: "sister", label: "Sister" },
    { value: "spouse", label: "Spouse" },
    { value: "son", label: "Son" },
    { value: "daughter", label: "Daughter" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: FormData = {
    name: "",
    relation: "",
    contact: "",
    dob: "",
    gender: Gender.Male,
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
    // enableReinitialize: selectedUserData ? true : false,
    initialValues: initialValues,
    validationSchema: familyRegisterSchema,

    onSubmit: async (values, { setSubmitting }) => {
      //   try {
      //     if (userId) {
      //       const response = await updatePersonalDetail(values, userId);
      //       if (response.status === 200) {
      //         setSuccess(true);
      //         setTimeout(() => {
      //           // Navigate to "/user-list" after 2 seconds
      //           navigate("/user-list");
      //         }, 2000);
      //         setError("");
      //       }
      //     } else {
      //       console.error("User ID is undefined");
      //     }
      //   } catch (error: any) {
      //     setError(error.message);
      //     console.error("An unknown error occurred:", error);
      //   } finally {
      //     setSubmitting(false);
      //   }
    },
  });

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add Family Member
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <Box sx={{ padding: "30px" }}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add Family Member
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
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <InputField
                label="Name"
                type="text"
                name="name"
                value={values.name}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
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
                sx={{ backgroundColor: "white" }}
                value={values.gender} // Add this line to bind the selected value
                onChange={handleChange} // Add this line to handle changes
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              <FormControl
                size="small"
                sx={{
                  marginTop: "16px",
                }}
                fullWidth
              >
                <InputLabel id="relation">relation</InputLabel>
                <Select
                  labelId="relation"
                  id="relation-select"
                  value={values.relation}
                  label="Relation"
                  onChange={(event) =>
                    setFieldValue("relation", event.target.value as string)
                  }
                >
                  {relationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.name && touched.name && (
                  <span
                    style={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      position: "absolute",
                      width: "100%",
                      bottom: "-15px",
                      left: 0,
                    }}
                  >
                    {errors.name}
                  </span>
                )}
              </FormControl>
              <BtnSubmit btnName="Add Member" />
            </DialogContent>
          </form>
        </Box>
      </BootstrapDialog>
    </Box>
  );
};

export default AddFamilyFrom;
