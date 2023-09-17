import "./App.css";
import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Pages/Home";
import NavBar from "./components/Layout/Navbar";
import AuthContext from "./components/store/auth-context";
import AuthForm from "./components/Auth/AuthForm";
import ForgotPassFrom from "./components/Auth/ForgotPassFrom";
import Profile from "./components/Pages/Profile";
import Expense from "./components/Expenses/Expense";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const body = {
    backgroundColor: "#282c34 ",

    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'center',

    color: "white",
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
