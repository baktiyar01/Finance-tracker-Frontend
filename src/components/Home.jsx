import React from "react";
import { Link } from "react-router-dom";
import aqshaLogo from "../components/images/aqsha-logo.jpg";
import { useAuth } from "../provider/authProvider";
import Header from "./Header";
const Home = () => {
  const { token } = useAuth();
  return (
    <div className="container">
      <div className="content">
        <div className="description">
          <h1>Regain control over your finances with Aqsha</h1>
          <p>
            Aqsha is an intuitive personal finance app that simplifies money
            management by offering expense tracking and savings assistance. It
            provides real-time insights into users' financial health and offers
            personalized recommendations for optimizing expenses. With secure
            data sync across devices, Aqsha helps users take control of their
            finances and achieve their financial goals with ease.
          </p>

          {!token && (
            <>
              <h3>Please login to start.</h3>
              <div className="btn-container">
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="image">
          <img
            className="home-image"
            src={aqshaLogo}
            alt="Aqsha App"
            width="298"
            height="274"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
