import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import "../assets/css/Home.css";

export interface HeroProps {
  firstCategory: string;
}

const Hero: React.FC<HeroProps> = ({ firstCategory }) => {
  return (
    <div className="homepage grid grid-full">
      <section className="grid-full hero-section">
        <div className="hero-content">
          <h1>Discover pages of unknown stories and wisdom.</h1>
        </div>
        <Link
          to={`/category/${firstCategory}`.replace(" ", "%20")}
          className="hero-button"
        >
          <ShoppingBag className="pr-5" />
          <p className="cta-text">Start Shopping</p>
        </Link>
      </section>
    </div>
  );
};

export default Hero;
