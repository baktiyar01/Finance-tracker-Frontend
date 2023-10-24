import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import Spinner from "react-bootstrap/Spinner";
axios.defaults.withCredentials = true;

const Login = () => {
  const userRef = useRef();
  const { setToken } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        user: user,
        pwd: pwd,
      });
      const token = response.data.token;

      setToken(token);
      navigate("/", { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      userRef.current.focus();
    }

    setLoading(false);
  };

  return (
    <div className={styles.SignApp}>
      {loading && (
        <div className="loading-container">
          <Spinner animation="border">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <section className={styles.section}>
          <p className={errMsg ? styles.errMsg : styles.offscreen}>{errMsg}</p>
          <h1 className={styles.h1}>Sign in</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="username" className={styles.label}>
              Username:
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
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
          <p>
            Need an account? <Link to="/signup">Sign Up</Link>
            <br />
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
