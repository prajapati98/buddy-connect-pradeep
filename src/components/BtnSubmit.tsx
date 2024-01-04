import { Button } from "@mui/material";
import React from "react";

interface BtnType {
  btnName: string;
  disabled: boolean;
}

const BtnSubmit: React.FC<BtnType> = ({ btnName, disabled }) => {
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
      disabled={disabled}
    >
      {btnName}
    </Button>
  );
};

export default BtnSubmit;
