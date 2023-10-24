import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Auth.module.css";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const { setToken } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pwd !== confirmPassword) {
      setErrMsg("Password did not match");
      setPwd("");
      setConfirmPassword("");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        user,
        pwd,
        confirmPassword,
      });
      const tokenResponse = await axios.post(`${apiUrl}/auth/login`, {
        user,
        pwd,
      });
      if (tokenResponse.data.token) {
        setToken(tokenResponse.data.token);
        setRegistered(true);
        navigate("/", { replace: true });
      }
      console.log(response.data);
      setErrMsg("");
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error occurred during signup");
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.SignApp}>
        {loading && (
          <div className="loading-container">
            <Spinner animation="border">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {!loading && !registered && (
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
