import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import jwt_decode from "jwt-decode";
import styles from "./Header.module.css";
const Header = ({ children }) => {
  const { token } = useAuth();
  const username = token ? jwt_decode(token).user : "";
  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navbarBrand}>
          AQSHA
        </Link>
        {token && (
          <>
            <Link to="/budget" className={styles.navLink}>
              Budget
            </Link>
            <Link to="/analytics" className={styles.navLink}>
              Analytics
            </Link>
            <div>{`Welcome, ${username}`}</div>
            <Link to="/logout" className={styles.logoutBtn}>
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
