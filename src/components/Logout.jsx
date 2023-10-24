import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Spinner from "react-bootstrap/Spinner";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = () => {
      try {
        setToken();
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    handleLogout();
    setLoading(false);
  }, [navigate, setToken]);

  return (
    <div className="loading-container">
      {loading && (
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default Logout;
