import React from "react";
import Navbar from "../../layout/Navbar";
import HeroBanner from "../../components/HeroBanner";
import Features from "../../components/Features";
import Services from "../../components/Services";
import Pricing from "../../components/Pricing";
import Download from "../../components/Download";
import ShopInfo from "../../components/ShopInfo";
import Footer from "../../layout/Footer";
import "../../css/styles.css";
import BalloonProducts from "../../components/BalloonProducts";

function StartPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <Features />
        <BalloonProducts />
        <Services />
        <Pricing />
        <Download />
        <ShopInfo />
      </main>
      <Footer />
    </>
  );
}

export default StartPage;
