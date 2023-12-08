import * as Yup from "yup";
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Email is not in the correct format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
