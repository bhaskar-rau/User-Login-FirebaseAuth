import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/Login" />;
};

export default Protected;
