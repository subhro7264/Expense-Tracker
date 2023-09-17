import React, { Fragment, useRef } from "react";
import { Form, Button, Col,Container,Row } from 'react-bootstrap';

const Expenses = (props) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const optionRef = useRef();

  const submitHandler = (e) => {
e.preventDefault();
const amount=amountRef.current.value;
const description=descriptionRef.current.value;
const option=optionRef.current.value;

const expense={
  id:Math.random().toString(),
  amount:amount,
  description:description,
  option:option,

}
console.log( 'this expense:', expense)
props.onAdd(expense)
amountRef.current.value=" ";
descriptionRef.current.value=" ";
optionRef.current.value=" ";
  };

  return (
    <Fragment>

     <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="expenseAmount">
              <Form.Label>Spent Money</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Your Expense Amount"
                ref={amountRef}
              />
            </Form.Group>

            <Form.Group controlId="expenseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                ref={descriptionRef}
              />
            </Form.Group>

            <Form.Group controlId="expenseCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" ref={optionRef}>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Rent">Rent</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Add Expenses
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </Fragment>
  );
};

export default Expenses;
