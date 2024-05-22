import React from "react";

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
