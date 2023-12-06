import React from "react";
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
import { Alert, Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import BtnSubmit from "./BtnSubmit";
import { addBankDetails } from "../network/user";
import { AddBankDetailsSchema } from "../schemas/AddBankDetailsSchema";
enum typeAccount {
  primary = "primary",
  secondary = "secondary",
}

export interface FormData {
  account_number: string;
  bank_name: string;
  bank_branch: string;
  ifsc_code: string;
  micr_code: string;
  cif_code: string;
  type_account: typeAccount;
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
  onSuccess: () => void; // Add this prop
}
const AddBankDetailsForm: React.FC<AddFamilyFormProps> = ({
  userId,
  onSuccess,
}) => {
  const [open, setOpen] = React.useState(false);
  const [res, setRes] = React.useState<ApiResponse | undefined>();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const initialValues: FormData = {
    account_number: "",
    bank_name: "",
    bank_branch: "",
    ifsc_code: "",
    micr_code: "",
    cif_code: "",
    type_account: typeAccount.primary,
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddBankDetailsSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (userId) {
          const response = await addBankDetails(values, userId);
          const responseData = response.data;
          setRes(responseData);

          if (response.data.success) {
            setTimeout(() => {
              onSuccess();
              handleClose();
              setRes(undefined);
            }, 1000);
          }
        } else {
          console.error("User ID is undefined");
        }
      } catch (error: any) {
        setRes(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        sx={{
          mb: 2.2,
        }}
      >
        Add Bank Details
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
            Add Bank Details
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
                label="Account Number"
                type="number"
                name="account_number"
                value={values.account_number}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />{" "}
              <InputField
                label="Bank Name"
                type="text"
                name="bank_name"
                value={values.bank_name}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="Bank Branch"
                type="text"
                name="bank_branch"
                value={values.bank_branch}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="IFSC CODE"
                type="text"
                name="ifsc_code"
                value={values.ifsc_code}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="MICR Code"
                type="text"
                name="micr_code"
                value={values.micr_code}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="CIF Code"
                type="text"
                name="cif_code"
                value={values.cif_code}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <RadioGroup
                row
                name="type_account"
                sx={{ backgroundColor: "white", mt: "3px" }}
                value={values.type_account} // Add this line to bind the selected value
                onChange={handleChange} // Add this line to handle changes
              >
                <FormControlLabel
                  value="primary"
                  control={<Radio />}
                  label="Primary"
                />
                <FormControlLabel
                  value="secondary"
                  control={<Radio />}
                  label="Secondary"
                />
              </RadioGroup>
              <BtnSubmit btnName="Add Member" />
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

export default AddBankDetailsForm;
