import React from "react";
import Classes from './Home.module.css';
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activePremium } from "../../store/expenses";
import DarkModeSwitch from "./Darkmode";
const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  const totalAmount = useSelector((state) => state.expense.totalAmount);
 const isDarkTheme = useSelector((state) => state.action.darkMode);
  const dispatch = useDispatch();
  const themeClass = isDarkTheme ? `${Classes.Home}` : "";
  return (
    
    <Container className="mt-4" >
      <Row className={themeClass}>
        <Col className="d-flex" >
          <h2>Welcome to the Expense Tracker {totalAmount}</h2>
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
        <Col> <DarkModeSwitch /></Col>
      </Row>
    </Container>
  );
};

export default Home;
