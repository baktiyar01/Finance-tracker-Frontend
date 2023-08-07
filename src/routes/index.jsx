import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Logout from "../components/Logout";
import Budget from "../components/Budget/Budget";
import Analytics from "../components/Analytics";
import Header from "../components/Header";

const Routers = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/budget",
          element: <Budget />,
        },
        {
          path: "/analytics",
          element: <Analytics />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  return (
    <Router>
      <Header />
      <Routes>
        {routesForPublic.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {!token &&
          routesForNotAuthenticatedOnly.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        {token &&
          routesForAuthenticatedOnly.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          ))}
      </Routes>
    </Router>
  );
};

export default Routers;
