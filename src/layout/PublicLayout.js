import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import * as React from "react";
import { CssBaseline, Slide } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Footer from "../components/Footer";
import TopbarPublic from "../components/TopbarPublic";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 20,
  });
  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const PublicLayout = (props) => {
  const { tid } = useAuth();
  const outlet = useOutlet();

  if (tid) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <CssBaseline />
      <HideOnScroll {...props}>
        <nav>
          <TopbarPublic />
        </nav>
      </HideOnScroll>
      {outlet}
      <Footer />
    </div>
  );
};
