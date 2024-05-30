import React, { useMemo } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../../css/styles.css";

const ProtectedLayout = () => {
  const outlet = useOutlet();

  const isAuthenticated = useMemo(
    () => localStorage.getItem("tid") !== null,
    []
  );

  // If isAuthenticated is false (no tid was found in localStorage), the user is redirected to the home page.
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ApplicationContext>
      <div>
        <Navbar />
        <main style={{ marginTop: "4rem" }}>{outlet}</main>
        <Footer />
      </div>
    </ApplicationContext>
  );
};

export default ProtectedLayout;
