import { Button } from "@mui/material";
import React from "react";
const BtnSubmit = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        padding: "10px 0",
        fontFamily: "roboto",
        marginTop: "20px",
      }}
    >
      Login
    </Button>
  );
};

export default BtnSubmit;
