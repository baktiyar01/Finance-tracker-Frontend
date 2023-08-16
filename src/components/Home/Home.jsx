import React from "react";
import { Link } from "react-router-dom";
import aqshaLogo from "../images/aqsha-logo.jpg";
import { useAuth } from "../../provider/authProvider";
import styles from "./Home.module.css";
const Home = () => {
  const { token } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.h1}>
            Regain control over your finances with Aqsha
          </h1>
          <p className={styles.p}>
            Aqsha is an intuitive personal finance app that simplifies money
            management by offering expense tracking and savings assistance. It
            provides real-time insights into users' financial health and offers
            personalized recommendations for optimizing expenses. With secure
            data sync across devices, Aqsha helps users take control of their
            finances and achieve their financial goals with ease.
          </p>

          {!token && (
            <>
              <h3 className={styles.h3}>Please login to start.</h3>
              <div className={styles.btnContainer}>
                <Link to="/login" className={styles.btnPrimary}>
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
        <div className={styles.image}>
          <img src={aqshaLogo} alt="Aqsha App" width="298" height="274" />
        </div>
      </div>
    </div>
  );
};

export default Home;
