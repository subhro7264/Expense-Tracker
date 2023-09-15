import React, { useState } from "react";
import AuthContext from "./auth-context";

const ContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const initialEndPoint = localStorage.getItem("endpoint");
  const [endPoint, setEndpoint] = useState(initialEndPoint);

   /*--------------------------------------->LOGIN HANDLER <-------------------------*/

  const loginHandler = (token, end) => {
    setToken(token);
    localStorage.setItem("token", token);
    setEndpoint(end);
    localStorage.setItem("endpoint", end);
  };
  /*--------------------------------------->LOGOUT HANDLER <-------------------------*/
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("endpoint");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    email: endPoint,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
