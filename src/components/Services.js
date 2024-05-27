import React from "react";

function Services() {
  return (
    <section id="services">
      <div className="section-text">
        <div className="section-text__title-centered text-white">
          Så kan vi hjälpa dig med dina fester!
        </div>
        <div className="service-cards">
          <div className="service-card">
            <div className="service-card__icon">
              <ion-icon name="balloon-outline" />
            </div>
            <div className="service-card__text-container">
              <div className="section-text__title-small">
                Ballonger och Dekorationer
              </div>
              <div className="section-text__desc">
                Vi erbjuder ett brett utbud av ballonger och festdekorationer
                för att göra din fest oförglömlig.
              </div>
            </div>
          </div>

          <div className="service-card active">
            <div className="service-card__icon">
              <ion-icon name="gift-outline" />
            </div>
            <div className="service-card__text-container">
              <div className="section-text__title-small">
                Personliga Festpaket
              </div>
              <div className="section-text__desc">
                Skapa skräddarsydda festpaket som passar just dina behov och gör
                din fest unik.
              </div>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card__icon">
              <ion-icon name="sparkles-outline" />
            </div>
            <div className="service-card__text-container">
              <div className="section-text__title-small">Specialeffekter</div>
              <div className="section-text__desc">
                Låt oss förse din fest med fantastiska specialeffekter som
                konfettikanoner och glitterdraperier.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
