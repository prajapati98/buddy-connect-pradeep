import * as Yup from "yup";
interface FormValues {
  dob: string;
}

const letters = /^[a-zA-Z]{3,255}$/;
const Number = /^(?!([0-9])\1*$)[1-9][0-9]{9,14}$/;
const dob = /^\d{4}-\d{2}-\d{2}$/;
const city = /^[a-zA-Z]{3,100}$/;
const state = /^[a-zA-Z]{2,100}$/;
const zipCode = /^[0-9]{6}$/;
const panCard = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "Please enter a valid First Name with a minimum of 3 characters.")
    .max(225, "Please enter a name with 255 characters or fewer.")
    .matches(letters, "First Name is not in the correct format")
    .required("First Name is required"),

  last_name: Yup.string()
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
  zip_code: Yup.string()
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
  country: Yup.string()
    .min(3, "Please enter a valid country name with a minimum of 3 characters.")
    .max(255, "Please enter a country name with 255 characters or fewer.")
    .matches(letters, "Country name is not in the correct format.")
    .required("Country name is required"),
  dob: Yup.string()
    .matches(dob, "Date of Birth is not in the correct format (yyyy-mm-dd)")
    .required("Date of Birth is required")
    .test("age", "User must be at least 18 years old", function (value) {
      const currentDate = new Date();
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const isBirthdayPassed =
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() >= birthDate.getDate());

      const adjustedAge = isBirthdayPassed ? age : age - 1;

      return adjustedAge >= 18;
    }),
  joining_date: Yup.string()
    .matches(dob, "Joining Date is not in the correct format (yyyy-mm-dd)")
    .test("joiningDate", "is 18 years after Date of Birth.", function (value) {
      const { dob } = this.parent as FormValues;

      const birthDate = new Date(dob);
      const eighteenYearsAgo = new Date(birthDate);
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() + 18);

      return new Date(value as string) >= eighteenYearsAgo;
    })
    .required("Joining Date is required"),
  pan_card: Yup.string()
    .matches(panCard, "PAN Card is not in the correct format")
    .required("PAN Card is required"),
  email: Yup.string()
    .matches(emailRegex, "Email is not in the correct format")
    .required("Email is required"),
  designation: Yup.string().required("Designation is required"),
  role: Yup.string().required("Role is required"),
}) as Yup.ObjectSchema<FormValues>;
