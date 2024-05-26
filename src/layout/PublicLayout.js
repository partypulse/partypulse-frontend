import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import * as React from "react";

export const PublicLayout = (props) => {
  const { tid } = useAuth();
  const outlet = useOutlet();

  if (tid) {
    return <Navigate to="/dashboard" replace />;
  }

  return <div>{outlet}</div>;
};
