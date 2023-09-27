import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

const ProfilePage = () => {
  const [img, setImg] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [isVerified, setIsVerified] = useState(false); // Uncomment if needed

  /*---------------------------------------------------->getProfileData<------------------------------------ */

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDzG7xWkD186fKUg_yhjslT2FShKXhEDPI"; // Replace with your API key

  const getProfileData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
      });

      const data = await response.json();
      console.log(data);

      // Uncomment if needed
      // setIsVerified(data.users[0].emailVerified);

      setFullName(data.users[0].displayName);
      setImg(data.users[0].photoUrl);
      setEmail(data.users[0].email);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <Fragment>
      <Container
        className="mt-4"
        style={{
          background: "#9b5de5",
          height: "25rem",
          width: "30rem",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row className="justify-content-center py-2">
          <Col xs={6} md={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={img}
                roundedCircle
                alt="Profile Image"
                style={{
                  width: "8rem",
                  height: "8rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4" >
          <Col>
            <h4
              style={{
                background: "#6ac096",
                borderRadius: "4px",
                padding: "0.5rem",
                textAlign: "center",
                color: "white",
              }}
            >
              Your Name: {fullName}
            </h4>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <h5
              style={{
                background: "#6ac096",
                borderRadius: "4px",
                padding: "0.5rem",
                textAlign: "center",
                color: "white",
              }}
            >
              Email: {email}
            </h5>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProfilePage;
