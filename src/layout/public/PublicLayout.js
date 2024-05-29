import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../../css/styles.css";

export const PublicLayout = (props) => {
  const { tid } = useAuth();
  const outlet = useOutlet();

  if (tid) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <Navbar />
      <main>{outlet}</main> <Footer />
    </div>
  );
};
