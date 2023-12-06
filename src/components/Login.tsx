import React from "react";
import { Box, Typography } from "@mui/material";
import InputField from "./InputField";
import BtnSubmit from "./BtnSubmit";
import logo from "../assets/image/logo.png";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/login/loginSlice";
import { AppDispatch } from "../store";
const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.login.user);
  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, { setSubmitting }) => {
        if (user) {
          dispatch(logout());
        } else {
          dispatch(login({ email: values.email, password: values.password }));
        }
      },
    });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 67px)"
    >
      <Box className="loginFrom">
        <img src={logo} alt="logo" className="loginFromLogo" />
        <Typography
          variant="h5"
          sx={{
            fontSize: "30px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={values.email}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
          <BtnSubmit btnName="Login" />
        </form>
      </Box>
    </Box>
  );
};

export default Login;
