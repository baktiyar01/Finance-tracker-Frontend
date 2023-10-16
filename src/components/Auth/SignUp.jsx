import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Auth.module.css";

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccessMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd !== confirmPassword) {
      setErrMsg("Password did not match");
      setPwd("");
      setConfirmPassword("");
      return;
    }

    try {
      const response = await axios.post(
        "https://finanse-tracker-backend.onrender.com/auth/signup",
        {
          user,
          pwd,
          confirmPassword,
        }
      );
      console.log(response.data);
      setSuccessMsg(true);
      setErrMsg("");
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error occurred during signup");
      setSuccessMsg(false);
    }
  };

  return (
    <>
      <div className={styles.SignApp}>
        {success ? (
          <section className={styles.section}>
            <h1>You are successfully registered</h1>
            <p>
              <Link to="/">Go to Home</Link>
            </p>
          </section>
        ) : (
          <section className={styles.section}>
            <p className={errMsg ? styles.errMsg : styles.offscreen}>
              {errMsg}
            </p>
            <h1 className={styles.h1}>Sign Up</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="username" className={styles.label}>
                User name:
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className={styles.input}
              />

              <label htmlFor="password" className={styles.label}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className={styles.input}
              />
              <label htmlFor="con-password" className={styles.label}>
                Confirm Password:
              </label>
              <input
                type="password"
                id="con-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default SignUp;
