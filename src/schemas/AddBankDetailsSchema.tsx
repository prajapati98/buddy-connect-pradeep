import * as Yup from "yup";

const account_number = /^\d{9,12}$/;
const bank_name = /^(([a-zA-Z]+\s)*[a-zA-Z]){3,255}$/;
const ifsc_code = /^[a-zA-Z]{4}[0-9]{7}$/;
const micr_code = /^\d{9}$/;
const cif_code = /^\d{11}$/;

export const AddBankDetailsSchema = Yup.object().shape({
  bank_name: Yup.string()
    .min(3, "Please enter a valid Bank Name with a minimum of 3 characters.")
    .max(255, "Please enter a Bank Name with 255 characters or fewer.")
    .matches(bank_name, "Bank Name is not in the correct format")
    .required("Bank Name is required"),

  bank_branch: Yup.string()
    .min(3, "Please enter a valid Bank Branch with a minimum of 3 characters.")
    .max(255, "Please enter a Bank Branch with 255 characters or fewer.")
    .matches(bank_name, "Bank Branch is not in the correct format")
    .required("Bank Branch is required"),

  account_number: Yup.string()
    .min(
      9,
      "Please enter a valid Account Number with a minimum of 9 characters."
    )
    .max(12, "Please enter an Account Number with 12 characters or fewer.")
    .matches(account_number, "Account Number is not in the correct format")
    .required("Account Number is required"),

  micr_code: Yup.string()
    .min(9, "Please enter a valid MICR Code with a minimum of 9 characters.")
    .max(9, "Please enter a MICR Code with exactly 9 characters.")
    .matches(micr_code, "MICR Code is not in the correct format")
    .required("MICR Code is required"),

  cif_code: Yup.string()
    .min(11, "Please enter a valid CIF Code with a minimum of 11 characters.")
    .max(11, "Please enter a CIF Code with exactly 11 characters.")
    .matches(cif_code, "CIF Code is not in the correct format")
    .required("CIF Code is required"),

  ifsc_code: Yup.string()
    .matches(ifsc_code, "IFSC Code is not in the correct format")
    .required("IFSC Code is required"),
});
