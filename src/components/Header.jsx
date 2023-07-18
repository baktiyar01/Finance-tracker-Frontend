import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import jwt_decode from "jwt-decode";
const Header = ({ children }) => {
  const { token } = useAuth();
  const username = token ? jwt_decode(token).user : "";
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          AQSHA
        </Link>
        {token && (
          <>
            <Link to="/budget" className="nav-link">
              Budget
            </Link>
            <Link to="/analytics" className="nav-link">
              Analytics
            </Link>
            <div className="username">{`Welcome, ${username}`}</div>
            <Link to="/logout" className="logout-btn">
              Logout
            </Link>
          </>
        )}
      </nav>
      <div className="content">{children}</div>
    </div>
  );
};

export default Header;
