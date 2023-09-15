import { useState, useRef, useContext, useEffect, Fragment } from "react";
// import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import classes from "./AuthForm.module.css";
// import CartContext from "../store/cart-context";


const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const authCtx = useContext(CartContext);
  // const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // useEffect(() => {
  //   // const logoutTimer =
  //   setTimeout(() => {
  //     authCtx.logout();
  //     navigate("/auth", { replace: true });
  //   }, 5 * 60 * 1000);
  //   // return () => {
  //   //   clearTimeout(logoutTimer);
  //   // };
  // });

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setEmail(enteredEmail);
    setIsLoading(true);
    // authCtx.email = email;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI";
    }
    if (!isLogin && enteredPassword !== passwordConfirmation) {
      alert("Password and confirmation password do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication failed";

        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      const email = data.email;
      const token = data.idToken;
      const endpoint = `/${email.replace(/\.|@/g, "")}`;
      // authCtx.login(token, endpoint);
      // navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>

          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirmation"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && (
              <div className="text-center">
                <Spinner animation="border" role="status"></Spinner>
              </div>
            )}
            {/* <div>
              <Link to="ForgotPassWord" target="_blank">
                Reset Password
              </Link>
            </div> */}

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>

      {/* <Routes>
          <Route path="ForgotPassWord" element={<ProfileForm />} />
        </Routes> */}
    </Fragment>
  );
};

export default AuthForm;
