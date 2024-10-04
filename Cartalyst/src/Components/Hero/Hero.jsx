import React from "react";
import { assets } from "../../assets/assets";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <h1>Catalysing your Cart Xperience</h1>
      <em>"Where your cravings meet the cart with precision!"</em>
      <p>
        Effortlessly store all your favorite products in one place, and let
        Cartalyst do the math! No more guesswork—just add to your cart, and
        we’ll keep track of the total for you. Whether it’s a quick snack, a
        shopping spree, or a last-minute necessity, we’ve got your cart covered!
        Ready to experience the smoothest checkout of your life?
      </p>

      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={assets.p1} className="d-block w-100" alt="slideimg" />
          </div>
          <div className="carousel-item">
            <img src={assets.p3} className="d-block w-100" alt="slideimg" />
          </div>
          <div className="carousel-item">
            <img src={assets.p2} className="d-block w-100" alt="slideimg" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
          style={{ color: "red" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
