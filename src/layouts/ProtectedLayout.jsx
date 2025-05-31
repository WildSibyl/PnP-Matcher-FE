import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-pnp-white">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
