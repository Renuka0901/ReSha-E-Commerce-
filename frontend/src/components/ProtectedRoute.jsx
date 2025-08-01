import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user || user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
