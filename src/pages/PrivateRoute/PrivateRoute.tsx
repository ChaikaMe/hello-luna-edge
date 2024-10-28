import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { ReactNode } from "react";

interface PrivateRouteProps {
  element: ReactNode;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  return auth.currentUser ? element : <Navigate to="/" />;
};

export default PrivateRoute;
