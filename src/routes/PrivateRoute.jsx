import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, redirectTo }) => {
    let isAuthenticated = useSelector(state => state?.auth?.userInfo?.access_token)
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute
