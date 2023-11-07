import React, { useState, FormEvent } from "react";
import { Box, Typography } from "@mui/material";
import FormField from "./FormField";
import BtnSubmit from "./BtnSubmit";
import logo from "../assets/image/logo.png";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
const Login: React.FC = () => {
  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // You can handle form submission here
  // };

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
        console.log(values);
      },
    });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
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
          <FormField
            label="Email"
            type="email"
            name="email"
            value={values.email}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
          <BtnSubmit />
        </form>
      </Box>
    </Box>
  );
};

export default Login;
