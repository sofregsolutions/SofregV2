import React from "react";

const AboutHeader = () => {
  return (
    <header
      className="page-header-cerv bg-img section-padding"
      data-background="assets/imgs/header/2.jpg"
      data-overlay-dark="4"
    >
      <div className="container pt-100 ontop">
        <div className="text-center">
          <h1 className="fz-100">About Us.</h1>
          <div className="mt-15">
            <a href="#" className="text-xl">Home</a>
            <span className="padding-rl-20 text-xl">|</span>
            <span className="main-color text-xl">About Us</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AboutHeader;
