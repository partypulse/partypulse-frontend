import React, { useMemo } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ApplicationContext } from "../contexts/ApplicationContext";
import Navbar from "./Navbar";
import "../css/styles.css";

const ProtectedLayout = () => {
  const outlet = useOutlet();

  const isAuthenticated = useMemo(
    () => localStorage.getItem("tid") !== null,
    []
  );

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ApplicationContext>
      <CssBaseline />

      <Navbar />
      {outlet}
    </ApplicationContext>
  );
};

export default ProtectedLayout;
