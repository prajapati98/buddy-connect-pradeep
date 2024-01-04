import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import InputField from "./InputField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  Alert,
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
import { AddFamilyMember } from "../network/user";

enum Gender {
  Male = "male",
  Female = "female",
}

export interface FormData {
  name: string;
  relation: string;
  contact: string;
  dob: string | null;
  address: string;
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
interface ApiResponse {
  success: boolean;
  message: string;
  response: {
    id: string;
    user_id: string;
  };
}
interface AddFamilyFormProps {
  userId: number | undefined;
  onSuccess: () => void;
}
const AddFamilyFrom: React.FC<AddFamilyFormProps> = ({ userId, onSuccess }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [res, setRes] = React.useState<ApiResponse | undefined>();
  const relationOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "brother", label: "Brother" },
    { value: "sister", label: "Sister" },
    { value: "spouse", label: "Spouse" },
    { value: "son", label: "Son" },
    { value: "daughter", label: "Daughter" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const initialValues: FormData = {
    name: "",
    relation: "",
    address: "",
    contact: "",
    dob: null,
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
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: familyRegisterSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      try {
        if (userId) {
          const response = await AddFamilyMember(values, userId);
          const responseData = response.data;
          setRes(responseData);

          if (response.data.success) {
            setIsLoading(false);
            onSuccess();
            handleClose();
            setRes(undefined);
            // setTimeout(() => {
            // }, 1000);
          }
        } else {
          console.error("User ID is undefined");
        }
      } catch (error: any) {
        console.error("An unknown error occurred:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        sx={{
          mb: 2.2,
        }}
      >
        Add Family Member
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <Box
          sx={{
            padding: { sx: 0, sm: "30px" },
          }}
        >
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
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
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
              {/* <InputField
                label=" DOB"
                type="text"
                name="dob"
                value={values.dob}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              /> */}
              <Box
                sx={{
                  position: "relative",
                  mt: "8px",
                  mb: "16px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      label="DOB"
                      value={values.dob}
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");

                        setFieldValue("dob", formattedDate);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errors.dob && touched.dob && (
                  <span
                    style={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      position: "absolute",
                      width: "100%",
                      bottom: "-22px",
                      left: 0,
                    }}
                  >
                    {errors.dob}
                  </span>
                )}
              </Box>
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
                  mt: "16px",
                  mb: "16px",
                  position: "relative",
                }}
                fullWidth
              >
                <InputLabel id="relation">relation</InputLabel>
                <Select
                  labelId="relation"
                  id="relation-select"
                  name="relation"
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
                {errors.relation && touched.relation && (
                  <span
                    style={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      position: "absolute",
                      width: "100%",
                      bottom: "-22px",
                      left: 0,
                    }}
                  >
                    {errors.relation}
                  </span>
                )}
              </FormControl>
              <BtnSubmit btnName="Add Member" disabled={isLoading} />
              {res !== undefined && (
                <Box>
                  {res?.success ? (
                    <Alert severity="success">{res?.message}</Alert>
                  ) : (
                    <Alert
                      variant="filled"
                      severity="error"
                      sx={{
                        marginTop: 2,
                      }}
                    >
                      {res?.message}
                    </Alert>
                  )}
                </Box>
              )}
            </form>
          </DialogContent>
        </Box>
      </BootstrapDialog>
    </Box>
  );
};

export default AddFamilyFrom;
