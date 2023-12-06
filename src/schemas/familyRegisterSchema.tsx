import * as Yup from "yup";
const letters = /^[a-zA-Z]+ [a-zA-Z]{3,255}$/;
const Number = /^(0|\+91)?\d{10}$/;
const dob = /^\d{4}-\d{2}-\d{2}$/;
const addressRegex = /^[a-zA-Z0-9\s,.'-]+$/;

export const familyRegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Please enter a valid First Name with a minimum of 3 characters.")
    .max(225, "Please enter a name with 255 characters or fewer.")
    .matches(letters, "First Name is not in the correct format")
    .required("First Name is required"),
  address: Yup.string()
    .min(3, "Please enter a valid address with a minimum of 3 characters.")
    .max(100, "Please enter an address with 100 characters or fewer.")
    .matches(addressRegex, "Address is not in the correct format")
    .required("Address is required"),

  contact: Yup.string()
    .matches(Number, "Contact number is not in the correct format")
    .required("Contact number is required"),
  dob: Yup.string()
    .matches(dob, "Date of Birth is not in the correct format (yyyy-mm-dd)")
    .required("Date of Birth is required"),
  relation: Yup.string().required("Relation is required"),
});
