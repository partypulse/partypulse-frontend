import React from "react";
import Navbar from "../../layout/Navbar";
import HeroBanner from "../../components/HeroBanner";
import Features from "../../components/Features";
import Services from "../../components/Services";
import Pricing from "../../components/Pricing";
import Download from "../../components/Download";
import Footer from "../../layout/Footer";
import "../../css/styles.css";

function StartPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <Features />
        <Services />
        <Pricing />
        <Download />
      </main>
      <Footer />
    </>
  );
}

export default StartPage;
