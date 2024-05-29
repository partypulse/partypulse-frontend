import React from "react";
import HeroBanner from "../../components/HeroBanner";
import Features from "../../components/Features";
import Services from "../../components/Services";
import Pricing from "../../components/Pricing";
import Download from "../../components/Download";
import ShopInfo from "../../components/ShopInfo";
import BalloonProducts from "../../components/BalloonProducts";

function StartPage() {
  return (
    <>
      <HeroBanner />
      <Features />
      <BalloonProducts />
      <Services />
      <Pricing />
      <Download />
      <ShopInfo />
    </>
  );
}

export default StartPage;
