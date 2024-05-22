import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as React from "react";

export const LoginLayout = (props) => {
  const { uid } = useAuth();
  const outlet = useOutlet();

  if (uid) {
    return <Navigate to="/" replace />;
  }

  return <div>{outlet}</div>;
};
