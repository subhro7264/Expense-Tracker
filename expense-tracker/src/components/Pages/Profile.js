import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Profile = () => {
  const fullNameRef = useRef();
  const profilePicRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const verifyEmail = useRef();
  const [isVerified, setIsVerified] = useState(false);
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
      // Handle the error here
      console.error("Error fetching profile data:", error);
    }
  }, []);
  
  useEffect(() => {
    console.log("hello");
    getProfileData();
  }, [getProfileData]);




//this function  will verify email
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

  return (
    <Fragment>
      <div className="user-profile-form-container">
      
        <h1>Contact Details</h1>
        {!isVerified && (
        <div >
          <label htmlFor="">Email:</label>
          <input ref={verifyEmail} type="email" />
          <button onClick={verifyHandler}>verify</button>
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

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Profile;
