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
import { Alert, Box } from "@mui/material";
import BtnSubmit from "./BtnSubmit";
import { addSalaryDetails } from "../network/user";
import { AddSalarySchema } from "../schemas/AddSalarySchema";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export interface FormData {
  basic_salary: string;
  home_rent_allowances: string;
  conveyance_allowance: string;
  pf_amount: string;
  esic_amount: string;
  income_tax: string;
  pt_amount: string;
  loan: string;
  health_insurance: string;
  appraisal_date: string | null;
  utility_allowance: string;
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
const AddSalaryDetailsForm: React.FC<AddFamilyFormProps> = ({
  userId,
  onSuccess,
}) => {
  const [open, setOpen] = React.useState(false);
  const [res, setRes] = React.useState<ApiResponse | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const initialValues: FormData = {
    basic_salary: "",
    home_rent_allowances: "",
    conveyance_allowance: "",
    pf_amount: "",
    esic_amount: "",
    income_tax: "",
    pt_amount: "",
    loan: "",
    health_insurance: "",
    appraisal_date: null,
    utility_allowance: "",
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
    validationSchema: AddSalarySchema,

    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      try {
        if (userId) {
          const response = await addSalaryDetails(values, userId);
          const responseData = response.data;
          setRes(responseData);

          if (response.data.success) {
            // setTimeout(() => {
            // }, 1000);
            onSuccess();
            handleClose();
            setRes(undefined);
            setIsLoading(false);
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
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        sx={{
          mb: 2.2,
        }}
      >
        Add Salary Details
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
            Add Salary Details
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
                label="Basic Salary"
                type="number"
                name="basic_salary"
                value={values.basic_salary}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />{" "}
              <InputField
                label="Home Rent Allowances"
                type="text"
                name="home_rent_allowances"
                value={values.home_rent_allowances}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="Conveyance Allowance"
                type="text"
                name="conveyance_allowance"
                value={values.conveyance_allowance}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="PF Amount"
                type="text"
                name="pf_amount"
                value={values.pf_amount}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="ESIC Amount"
                type="text"
                name="esic_amount"
                value={values.esic_amount}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="Income Tax"
                type="text"
                name="income_tax"
                value={values.income_tax}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="PT Amount"
                type="text"
                name="pt_amount"
                value={values.pt_amount}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="Loan"
                type="text"
                name="loan"
                value={values.loan}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <InputField
                label="Health Insurance"
                type="text"
                name="health_insurance"
                value={values.health_insurance}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
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
                      label="Appraisal Date"
                      value={values.appraisal_date}
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        setFieldValue("appraisal_date", formattedDate);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errors.appraisal_date && touched.appraisal_date && (
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
                    {errors.appraisal_date}
                  </span>
                )}
              </Box>
              <InputField
                label="Utility Allowance"
                type="text"
                name="utility_allowance"
                value={values.utility_allowance}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              <BtnSubmit btnName="Add Salary" disabled={isLoading} />
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

export default AddSalaryDetailsForm;
