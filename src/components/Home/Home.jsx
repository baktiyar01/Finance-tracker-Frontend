import React from "react";
import styles from "./Home.module.css";
import Card from "react-bootstrap/Card";
import Lottie from "react-lottie";
import animationData from "../assets/homeAnimation.json";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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
        </div>
        <div className={styles.image}>
          <Lottie
            animationData={animationData}
            options={defaultOptions}
            height={300}
            width={300}
            loop={true}
          />
        </div>
      </div>

      <div className={styles.aboutUs}>
        <h2>About Us</h2>
        <div className={styles.aboutUsColumns}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Text>
                Welcome to Aqsha! We are dedicated to helping individuals manage
                their finances effectively with our intuitive expense tracking
                app.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Body>
              <Card.Text>
                Our mission is to provide you with the tools to take control of
                your financial journey. With Aqsha, you can easily track your
                expenses, analyze spending patterns, and make informed decisions
                about your finances.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Body>
              <Card.Text>
                Aqsha empowers you to understand where your money goes and make
                proactive changes to achieve your financial goals. No more
                confusion – just clear insights and actionable steps to
                financial well-being.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className={styles.instructions}>
        <h2>How to Use the Application</h2>
        <Card className={styles.card}>
          <Card.Body>
            {" "}
            Getting started with Aqsha is simple. Sign up or log in to your
            account and start tracking your expenses. You can add budgets,
            monitor your spending, and receive personalized recommendations to
            optimize your finances.
          </Card.Body>
        </Card>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2023 Made by Baktiyar</p>
        <a
          href="https://www.linkedin.com/in/baktiyar-yerkinov-9271ba226/"
          className={styles.footerLink}
        >
          Linkedin
        </a>
      </footer>
    </div>
  );
};

export default Home;
