import React, {

  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
// import { useNavigate} from 'react-router-dom'
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
// import AuthContext from "../store/auth-context";

const Profile = () => {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  const fullNameRef = useRef();
  const profilePicRef = useRef();
  const verifyEmail = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // const navigate = useNavigate();
  // const logoutHandler = () => {
  //   authCtx.logout();
  //   navigate("/auth", { replace: true });
  // };

  /*---------------------------------------------------->getProfileData<------------------------------------ */
  const getProfileData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      setIsVerified(data.users[0].emailVerified);
      fullNameRef.current.value = data.users[0].displayName;
      profilePicRef.current.value = data.users[0].photoUrl;
      verifyEmail.current.value = data.users[0].email;
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, []);

  useEffect(() => {
    console.log("hello");
    getProfileData();
  }, [getProfileData]);

  /*---------------------------------------------------->verify email<------------------------------------ */
  async function verifyHandler() {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  }

  /*---------------------------------------------------->Submit And Post req to firebase<------------------------------------ */
  const submitHandler = async (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const profilePic = profilePicRef.current.value;
    const token = localStorage.getItem("token");

    if (!fullName || !profilePic) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: fullName,
            photoUrl: profilePic,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess(true);
        setError("");
        fullNameRef.current.value = "";
        profilePicRef.current.value = "";
      } else {
        const data = await response.json();
        setError(data.error.message || "Failed to update profile.");
      }
    } catch (error) {
      setError("An error occurred while updating the profile.");
    }
  };

  const mainCon={
    backgroundColor:' #282c34',
    borderRadius: "5px",
    boxShadow:' 0 2px 4px rgba(0, 0, 0, 0.1)',
    WebkitBoxShadow: '3px 3px 5px 6px white',
  }
  return (
 
      <Container  style={mainCon} className=" mt-5  py-4">
        <Row className="m-4  justify-content-center">
          <Col xs={12} md={6}>
            <h1>Contact Details</h1>
            <div className="user-profile-form-container p-4">
              {!isVerified && (
                <div className="mb-3 df-justify-content-center">
                  <label htmlFor="">Email:</label>
                  <input ref={verifyEmail} type="email" />
                  <Button variant="primary" onClick={verifyHandler}>
                    Verify
                  </Button>
                </div>
              )}

              <Form onSubmit={submitHandler} className="user-profile-form">
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    ref={fullNameRef}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="profilePic">
                  <Form.Label>Profile Photo URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter a valid profile photo URL"
                    ref={profilePicRef}
                    required
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                {success && (
                  <Alert variant="success">Profile updated successfully!</Alert>
                )}

                <Button className="mt-3" variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>
              {/* {isLoggedIn && (
              <Button
                variant="outline-danger"
                onClick={logoutHandler}
                className="position-absolute top-0 end-0 mt-3 me-3"
              >
                Logout
              </Button>
            )} */}
            </div>
          </Col>
        </Row>
      </Container>
    
  );
};

export default Profile;
