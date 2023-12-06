import { useNavigate } from "react-router-dom";
export const LogOut = () => {
  const navigate = useNavigate();
  localStorage.removeItem("user");
  navigate("/login");
};
