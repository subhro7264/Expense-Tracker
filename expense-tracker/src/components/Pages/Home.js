import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activatePremium } from "../../store/expenses";
import { saveAs } from 'file-saver'; // Import this library to handle file downloads

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const items = useSelector((state) => state.expense.items);

  const dispatch = useDispatch();

  const handleDownloadCSV = () => {
    // Convert your items data to CSV format
    const csvData = items.map(item => `${item.description},${item.option},${item.amount}`).join('\n');

    // Create a Blob with the CSV data and set the MIME type
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Use the file-saver library to trigger the download
    saveAs(blob, 'expenses.csv');
  };

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
      <Row className="m-4 justify-content-center">
        <Col>
          {totalAmount > 10000 && (
            <Button
              onClick={() => {
                dispatch(activatePremium());
              }}
            >
              Activate Premium
            </Button>
          )}
        </Col>

        <Col>
          <h2>Total Amount</h2>
          <h3>{totalAmount}</h3>
        </Col>
        <Col>
        
          <Link onClick={handleDownloadCSV}>
            Download CSV
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;


