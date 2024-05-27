import React from "react";

function Pricing() {
  return (
    <section id="pricing">
      <div className="pricing-upper">
        <div className="section-text__title-centered text-white">
          Priser för Alla Dina Festbehov
        </div>
      </div>
      <div className="pricing-lower">
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="pricing-card__header">
              <span className="pricing-card__subtitle">Basic Party Pack</span>
              <div className="pricing-card__title">
                299<span> SEK / månad</span>
              </div>
            </div>
            <ul className="pricing-card__features">
              <li>10 Ballonger</li>
              <li>5 Partyhattar</li>
              <li>1 Konfettikanon</li>
            </ul>
            <a href="#pricing" className="pricing-card__btn">
              Beställ nu
            </a>
          </div>

          <div className="pricing-card">
            <div className="pricing-card__header">
              <span className="pricing-card__subtitle">Premium Party Pack</span>
              <div className="pricing-card__title">
                499<span> SEK / månad</span>
              </div>
            </div>
            <ul className="pricing-card__features">
              <li>20 Ballonger</li>
              <li>10 Partyhattar</li>
              <li>2 Konfettikanoner</li>
              <li>1 Glitterdraperi</li>
            </ul>
            <a href="#pricing" className="pricing-card__btn">
              Beställ nu
            </a>
          </div>

          <div className="pricing-card">
            <div className="pricing-card__header">
              <span className="pricing-card__subtitle">
                Ultimate Party Pack
              </span>
              <div className="pricing-card__title">
                699<span> SEK / månad</span>
              </div>
            </div>
            <ul className="pricing-card__features">
              <li>50 Ballonger</li>
              <li>25 Partyhattar</li>
              <li>5 Konfettikanoner</li>
              <li>2 Glitterdraperier</li>
              <li>1 Fotobås-kit</li>
            </ul>
            <a href="#pricing" className="pricing-card__btn">
              Beställ nu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
