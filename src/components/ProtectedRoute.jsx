import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function ProtectedRoute({
  children,
  allowedRoles,
  // navigatePathWithSlash = "/signin",
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const payload = jwtDecode(token);

  if (payload && payload.role) {
    const { role } = payload;

    console.log("CURRENT ROLE IN TOKEN: ", role, allowedRoles);
    if (allowedRoles.includes(role)) {
      console.log("CURRENT ROLE: ", role);
      return children;
    }
  }

  return <Navigate to='/' />;
}
