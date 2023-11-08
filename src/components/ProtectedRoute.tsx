import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const navigate = useNavigate();
  console.log(isAuthenticated());
  useEffect(() => {
    console.log(isAuthenticated());
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return isAuthenticated() ? <>{children}</> : null;
};

export default Protected;
