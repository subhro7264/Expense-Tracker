import React, { Fragment } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";

function ContextualExample() {
  const totalAmount = useSelector((state) => state.expense.totalAmount);

  const expenses = useSelector((state) => state.expense.items);
  console.log("expense chart:", expenses);

  // Calculate the percentage for each expense
  const progressBars = expenses.map((expense) => {
    const now = (expense.amount / totalAmount) * 100;
    return (
      <ProgressBar
        key={expense.id}
        variant="dark"
        style={{ background: "#7209b7", margin: "0.9rem", width: "70%" }}
        now={now}
        label={`${now.toFixed(2)}%`}
      />
    );
  });

  return (
    <Fragment>
      <Card>
        <Card.Body style={{ background: "#FCCA46", paddingLeft:'7rem'}}>
          <div>{progressBars}</div>
        </Card.Body>

        <div>
          <Card.Footer style={{ background: "#FE7F2D" }}>
            <Card.Title>Total Amount</Card.Title>
            <h3>{`$${totalAmount.toFixed(2)}`}</h3>
          </Card.Footer>
        </div>
      </Card>
    </Fragment>
  );
}

export default ContextualExample;
