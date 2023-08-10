import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Spinner from "react-bootstrap/Spinner";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      setToken();
      navigate("/", { replace: true });
    };

    const timeout = setTimeout(() => {
      handleLogout();
    }, 500);

    return () => clearTimeout(timeout);
  }, [navigate, setToken]);

  return (
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
  );
};

export default Logout;
