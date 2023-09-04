import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    let timeoutId;

    const autoLogout = () => {
      localStorage.removeItem("token");
      setToken(null);
      toast.error("You're unauthorized. Please log in again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        onClose: () => {
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        },
      });
    };

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      timeoutId = setTimeout(autoLogout, 24 * 60 * 60 * 1000);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }

    return () => clearTimeout(timeoutId);
  }, [token]);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
