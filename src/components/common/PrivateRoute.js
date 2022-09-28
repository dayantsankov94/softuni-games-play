import { AuthContext } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default PrivateRoute;