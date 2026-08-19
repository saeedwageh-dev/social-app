import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1016]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-white" />
      </div>
    );
  }

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;