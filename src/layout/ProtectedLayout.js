import React, { useMemo } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ApplicationContext } from "../contexts/ApplicationContext";

import TopbarLoggedIn from "../components/TopbarLoggedIn";

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

      <div className="app">
        <main className="content">
          <TopbarLoggedIn />
          {outlet}
        </main>
      </div>
    </ApplicationContext>
  );
};

export default ProtectedLayout;
