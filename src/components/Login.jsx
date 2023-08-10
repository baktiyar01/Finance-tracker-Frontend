import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
axios.defaults.withCredentials = true;

const Login = () => {
  const userRef = useRef();
  const { setToken } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        user: user,
        pwd: pwd,
      });
      const token = response.data.token;

      setTimeout(() => {
        setToken(token);
        navigate("/", { replace: true });
      }, 500);
      console.log(response.data);
      setSuccess(true);
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
  };

  return (
    <div className="SignApp">
      {success ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner animation="border">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <section>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button type="submit">Submit</button>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
