import * as Yup from "yup";

const letters = /^[a-zA-Z]{3,255}$/;
const Number = /^((0)|([+]91 ))\d{10}$/;
const dob = /^\d{4}-\d{2}-\d{2}$/;
const city = /^[a-zA-Z]{3,100}$/;
const state = /^[a-zA-Z]{2,100}$/;
const zipCode = /^[0-9]{6}$/;
const panCard = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Please enter a valid First Name with a minimum of 3 characters.")
    .max(225, "Please enter a name with 255 characters or fewer.")
    .matches(letters, "First Name is not in the correct format")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Please enter a valid Last Name with a minimum of 3 characters.")
    .max(225, "Please enter a name with 255 characters or fewer.")
    .matches(letters, "Last Name is not in the correct format")
    .required("Last Name is required"),
  address: Yup.string()
    .min(3, "Please enter a valid address with a minimum of 3 characters.")
    .max(100, "Please enter an address with 100 characters or fewer.")
    .matches(letters, "Address is not in the correct format")
    .required("Address is required"),
  city: Yup.string()
    .min(3, "Please enter a valid city with a minimum of 3 characters.")
    .max(100, "Please enter a city with 100 characters or fewer.")
    .matches(city, "City is not in the correct format")
    .required("City is required"),
  zipCode: Yup.string()
    .matches(zipCode, "Zip Code is not in the correct format")
    .required("Zip Code is required"),
  state: Yup.string()
    .min(2, "Please enter a valid state with a minimum of 2 characters.")
    .max(100, "Please enter a state with 100 characters or fewer.")
    .matches(state, "State is not in the correct format")
    .required("State is required"),
  contact: Yup.string()
    .matches(Number, "Contact number is not in the correct format")
    .required("Contact number is required"),
  // Add similar custom error messages for other fields
  dob: Yup.string()
    .matches(dob, "Date of Birth is not in the correct format (yyyy-mm-dd)")
    .required("Date of Birth is required"),
  joiningDate: Yup.string()
    .matches(dob, "Joining Date is not in the correct format (yyyy-mm-dd)")
    .required("Joining Date is required"),
  panCard: Yup.string()
    .matches(panCard, "PAN Card is not in the correct format")
    .required("PAN Card is required"),
});
