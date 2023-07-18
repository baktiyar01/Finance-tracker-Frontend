// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
import AuthProvider from "./provider/authProvider";
import Routers from "./routes";
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </Router>
//   );
// };
function App() {
  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}

export default App;
