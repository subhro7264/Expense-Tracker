import "./App.css";
import { Fragment} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {  useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Pages/Home";
import NavBar from "./components/Layout/Navbar";

import AuthForm from "./components/Auth/AuthForm";
import ForgotPassFrom from "./components/Auth/ForgotPassFrom";
import Profile from "./components/Pages/Profile";
import Expense from "./components/Expenses/Expense";

function App() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  const body = {
    background: "#ffffff ",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'center',

    color: "black",
  };
  return (
    <Fragment>
      <NavBar />
    
      <div style={body}>
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/auth" replace />}
          />
          isLoggedIn && <Route path="/auth" element={<AuthForm />} />
          <Route path="/auth/ForgotPassWord" element={<ForgotPassFrom />} />
          <Route path="//profile" element={<Profile />} />
          isLoggedIn&& !Profile && <Route path="/Add-Expenses" element={ <Expense />}/>
        </Routes>
        
      </div>
    </Fragment>
  );
}

export default App;
