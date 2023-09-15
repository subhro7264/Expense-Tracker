import React, { Fragment, useRef ,useState} from "react";
import { Form, Button, Alert } from 'react-bootstrap';
const Profile = () => {
  const fullNameRef = useRef();
  const profilePicRef = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const submitHandler =async (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const profilePic = profilePicRef.current.value;

    const update = {
      fullName: fullName,
      profilePic: profilePic,
    };
    if (!fullName || !profilePic) {
        setError('Please fill out all fields.');
        return;
      }
    fullNameRef.current.value='';
    profilePicRef.current.value='';

    const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?KEY=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI",
        {
          method: "POST",
          body: JSON.stringify(update),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

  };

  return (
    <Fragment>
  <div className="user-profile-form-container">
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

        {success && <Alert variant="success">Profile updated successfully!</Alert>}

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
</Fragment>

  );
};

export default Profile;
