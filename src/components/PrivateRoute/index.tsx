import { useAppSelector } from "../../store/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.user.token);
  const location = useLocation();
  if (isAuthenticated) {
    return props.element;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};
