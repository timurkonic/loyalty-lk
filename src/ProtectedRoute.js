import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authorized, children }) => {
    if (authorized === undefined)
      return null;
    if (!authorized) {
      return <Navigate to="/login"/>;
    }
    return children;
};

export default ProtectedRoute;