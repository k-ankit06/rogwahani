import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ allowedRoles }) => {
    const { user, token } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    }

    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />; // Redirect if role is not allowed
    }

    return <Outlet />; // Allow access to the route
};

export default AuthGuard;
