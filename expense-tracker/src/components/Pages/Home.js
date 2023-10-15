import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activePremium } from "../../store/expenses";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const dispatch = useDispatch();

  return (
    <Container className="mt-4">
      <Row>
        <Col className="d-flex">
          <h2>Welcome to the Expense Tracker </h2>
          {isLoggedIn && (
            <div className="ms-auto md-5" variant="outline-warning">
              Your Profile Incomplete? <Link to="/profile">Complete Now</Link>
            </div>
          )}
        </Col>
      </Row>
      <Row className="m-4 justify-content-center" >
        <Col>
          {" "}
          {totalAmount > 10000 && (
            <Button
              onClick={() => {
                dispatch(activePremium());
              }}
            >
              Activate Premium
            </Button>
          )}{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
