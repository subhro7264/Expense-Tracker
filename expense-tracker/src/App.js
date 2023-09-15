import "./App.css";
import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Pages/Home";
import NavBar from "./components/Layout/Navbar";
import AuthContext from "./components/store/auth-context";
import AuthForm from "./components/Auth/AuthForm";
import ForgotPassFrom from "./components/Auth/ForgotPassFrom";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/auth" replace />}
        />
        isLoggedIn && <Route path="/auth" element={<AuthForm />} />
        <Route
            path="/auth/ForgotPassWord"
            element={<ForgotPassFrom />}
          />
       
      
      </Routes>
    </Fragment>
  );
}

export default App;
