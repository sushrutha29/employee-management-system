import { Navigate } from "react-router-dom";
import { getRole } from "../utils/authStorage";

export default function RequireRole({ role, children }) {
    const storedRole = getRole();
    if (!storedRole) return <Navigate to="/" />;
    if (role && storedRole !== role) return <Navigate to="/" />;
    return children;
}