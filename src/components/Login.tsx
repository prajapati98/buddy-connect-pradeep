import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import InputField from "./InputField";
import BtnSubmit from "./BtnSubmit";
import logo from "../assets/image/logo.png";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/login/loginSlice";
import { AppDispatch } from "../store";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedState = useSelector((state: any) => state.login);
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
        if (selectedState.user) {
          dispatch(logout());
        } else {
          dispatch(login({ email: values.email, password: values.password }));
        }
      },
    });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (selectedState.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (selectedState.isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Typography>{selectedState.errorMessage}</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 67px)"
    >
      <Box className="loginFrom">
        <Box
          sx={{
            backgroundColor: "#1976d2",
            width: "fit-content",
            mb: 1,
          }}
        >
          <img src={logo} alt="logo" className="loginFromLogo" />
        </Box>
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
          <Box
            sx={{
              position: "relative",
            }}
          >
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              variant="outlined"
              margin="none"
              fullWidth
              className="block-input"
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
              sx={{
                mt: "14px",
                mb: "14px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && touched.password && (
              <Typography
                sx={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  position: "absolute",
                  width: "100%",
                  bottom: { xs: "-8px", md: "-8px" },
                  left: 0,
                }}
              >
                {errors.password}
              </Typography>
            )}
          </Box>
          <BtnSubmit btnName="Login" disabled={selectedState.loading} />
        </form>
        {selectedState.isError ? (
          <Alert
            variant="filled"
            severity="error"
            sx={{
              marginTop: 2,
            }}
          >
            {selectedState.errorMessage}
          </Alert>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Login;
