import React from "react";
import { Box, TextField, TextFieldProps } from "@mui/material";

type FormFieldProps = TextFieldProps & {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<FormFieldProps> = (props) => {
  const { errors, touched, handleChange, handleBlur, ...rest } = props;

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        className="block-input"
        onChange={handleChange}
        onBlur={handleBlur}
        size="small"
        {...rest}
      />
      {errors[rest.name as string] && touched[rest.name as string] && (
        <span
          style={{
            color: "#d32f2f",
            fontSize: "12px",
            position: "absolute",
            width: "100%",
            bottom: "-10px",
            left: 0,
          }}
        >
          {errors[rest.name as string]}
        </span>
      )}
    </Box>
  );
};

export default InputField;
