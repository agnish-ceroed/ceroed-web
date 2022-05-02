import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const adminRoutes = [
    '/emissions',
]

const PrivateRoute = ({ children, redirectTo }) => {
    const navigate = useNavigate()
    let location = useLocation();

    let isAuthenticated = useSelector(state => state.auth.userInfo.access_token)
    let isAdmin = useSelector(state => state.auth.role === "business")

    useEffect(() => {
        if (isAuthenticated) {
            if (!isAdmin && adminRoutes.indexOf(location.pathname) > -1) {
                // navigate("/dashboard");
            }
        }
    }, [isAuthenticated, isAdmin, location.pathname, navigate])

    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute
