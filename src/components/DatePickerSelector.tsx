import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { Box, TextField, TextFieldProps } from "@mui/material";
import { FormikErrors } from "formik";

import "react-datepicker/dist/react-datepicker.css";

type FormFieldProps = TextFieldProps & {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<FormData>>;
};

const DatePickerSelector: React.FC<FormFieldProps> = (props) => {
  const { errors, setFieldValue, touched, handleBlur, ...rest } = props;

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker", "DatePicker"]}>
          <DatePicker
            onBlur={handleBlur}
            {...rest}
            sx={{
              mt: "16px",
              mb: "16px",
            }}
            slotProps={{ textField: { size: "small" } }}
            onChange={(date) => {
              // Check if date is a valid type before formatting
              if (date instanceof Date || typeof date === "string") {
                const formattedDate = dayjs(date).format(
                  "YYYY-MM-DD"
                ) as string;
                setFieldValue("appraisal_date", formattedDate);
              }
            }}
            onError={(error, value) => {
              console.error("Date Picker Error:", error);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      {errors[rest.name as string] && touched[rest.name as string] && (
        <span
          style={{
            color: "#d32f2f",
            fontSize: "12px",
            position: "absolute",
            width: "100%",
            bottom: "-7px",
            left: 0,
          }}
        >
          {errors[rest.name as string]}
        </span>
      )}
    </Box>
  );
};

export default DatePickerSelector;
