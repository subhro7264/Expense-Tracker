import React, { Fragment } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activatePremium } from "../../store/expenses";
import { saveAs } from "file-saver";
import ExpenseChart from "./ChartExpense";


const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const items = useSelector((state) => state.expense.items);
  const isActive = useSelector((state) => state.expense.isActive);
  const active = !!isActive;
  const dispatch = useDispatch();

  const handleDownloadCSV = () => {
    const csvData = items.map((item) => `${item.description},${item.option},${item.amount}`).join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    saveAs(blob, "expenses.csv");
  };

  const tableHeaderStyle = {
    backgroundColor: "#fcca46",
  };


  return (
    <Fragment>
      <Container className="mt-4">
        <Row>
          <Col className="d-flex" >
            <h2> Welcome to the Expense Tracker </h2>
            {isLoggedIn && (
              <div className="ms-auto md-5" >
              Your Profile Incomplete?<Link to="/profile">Complete Now</Link>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {totalAmount > 10000 && (
              <Button
                onClick={() => {
                  dispatch(activatePremium());
                }}
                variant="success">
                Activate Premium
              </Button>
            )}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col
            style={{
              borderRadius: "10px",
              backgroundColor: "#fe7f2d",
              padding: "20px",
            }}>
            <h2>Your Expenses</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Amount</th>
                  <th style={tableHeaderStyle}>Description</th>
                  <th style={tableHeaderStyle}>Option</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={tableHeaderStyle}>{item.amount}</td>
                    <td style={tableHeaderStyle}>{item.description}</td>
                    <td style={tableHeaderStyle}>{item.option}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Col>
              {active && (
                <Button onClick={handleDownloadCSV} variant="primary">
                  Download CSV
                </Button>
              )}
            </Col>
            
          </Col>
           <Col>
          <ExpenseChart/>
        </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
