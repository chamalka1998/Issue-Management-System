import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  // If user exists, render the child routes (Outlet). Otherwise, redirect to login.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
