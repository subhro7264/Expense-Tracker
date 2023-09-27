import "./App.css";
import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Pages/Home";
import NavBar from "./components/Layout/Navbar";

import AuthForm from "./components/Auth/AuthForm";
import ForgotPassFrom from "./components/Auth/ForgotPassFrom";
import Profile from "./components/Pages/Profile";
import Expense from "./components/Expenses/Expense";
import ProfilePage from "./components/Pages/profilePage";

function App() {
  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isLoggedIn = !!token;

  return (
    <Fragment>
      <div className={`App ${darkMode ? "dark" : "light"}`}>
        <NavBar />

        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/auth" replace />}
          />
          isLoggedIn && <Route path="/auth" element={<AuthForm />} />
          <Route path="/auth/ForgotPassWord" element={<ForgotPassFrom />} />
          <Route path="//profile" element={<Profile />} />
          isLoggedIn && !Profile && 
         <Route path="/Add-Expenses" element={<Expense />} />
      
         isLoggedIn && <Route  path="/profilePage" element={<ProfilePage/> } /> 
        </Routes>
       
      </div>
    </Fragment>
  );
}

export default App;
