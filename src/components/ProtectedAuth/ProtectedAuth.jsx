import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedAuth({ children }) {
  const { userToken } = useContext(AuthContext);
  if (userToken) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

export default ProtectedAuth;
