import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Container className="mt-4" >

        <Row>
          <Col className="  d-flex ">
            <h2 className="">Welcome to the Expense Tracker</h2>
            {isLoggedIn && (
              <div className="ms-auto md-5" variant="outline-warning">
               Your Profile Incomplete ? <Link to="profile"> Complete Now</Link>
              </div>
            )}
          </Col>
        </Row>
    
    </Container>
  );
};

export default Home;
