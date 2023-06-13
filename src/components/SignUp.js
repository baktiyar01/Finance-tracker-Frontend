import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("http://localhost:3001/signup", {
        user,
        pwd,
        confirmPassword,
      });
      console.log(response.data);

      // Display success message
      setSuccessMsg(true);
      setErrMsg("");
    } catch (error) {
      console.log("Error:", error);
      // Display error message
      setErrMsg("Error occurred during signup");
      setSuccessMsg(false);
    }
  };

  return (
    <>
      <div className="SignApp">
        {success ? (
          <section>
            <h1>You are successfully registered</h1>
            <p>
              <Link to="/">Go to Home</Link>
            </p>
          </section>
        ) : (
          <section>
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">UserName:</label>
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
              <label htmlFor="con-password">Confirm Password:</label>
              <input
                type="password"
                id="con-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default SignUp;
