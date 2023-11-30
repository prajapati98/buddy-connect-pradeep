import * as Yup from "yup";

const salaryPattern = /^([1-9]{1}\d{0,7})[\.](\d{1,2}$)|^([1-9]{1}\d{0,7})$/;
const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export const AddSalarySchema = Yup.object().shape({
  basic_salary: Yup.string()
    .matches(salaryPattern, "Invalid basic salary")
    .required("Basic salary is required"),
  home_rent_allowances: Yup.string()
    .matches(salaryPattern, "Invalid home rent allowances")
    .required("Home rent allowances are required"),
  conveyance_allowance: Yup.string()
    .matches(salaryPattern, "Invalid conveyance allowance")
    .required("Conveyance allowance is required"),
  pf_amount: Yup.string()
    .matches(salaryPattern, "Invalid PF amount")
    .required("PF amount is required"),
  esic_amount: Yup.string()
    .matches(salaryPattern, "Invalid ESIC amount")
    .required("ESIC amount is required"),
  income_tax: Yup.string()
    .matches(salaryPattern, "Invalid income tax")
    .required("Income tax is required"),
  pt_amount: Yup.string()
    .matches(salaryPattern, "Invalid PT amount")
    .required("PT amount is required"),
  loan: Yup.string()
    .matches(salaryPattern, "Invalid loan amount")
    .required("Loan amount is required"),
  health_insurance: Yup.string()
    .matches(salaryPattern, "Invalid health insurance amount")
    .required("Health insurance amount is required"),
  appraisal_date: Yup.string()
    .matches(dateFormat, "Invalid appraisal date format (use YYYY-MM-DD)")
    .required("Appraisal date is required"),
  utility_allowance: Yup.string()
    .matches(salaryPattern, "Invalid utility allowance")
    .required("Utility allowance is required"),
});
