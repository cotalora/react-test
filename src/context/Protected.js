import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const Protected = ({ children }) => {
    
    const { user } = useAuth();

    if (!user) {
        return (<Navigate to="/login" replace />);
    }
    return children;
};

export default Protected;