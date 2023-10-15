import React, { Fragment, useRef } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { addExpense} from "../../store/expenses";
import { useDispatch } from "react-redux";

const Expenses = (props) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const optionRef = useRef();
  const email = localStorage.getItem("endpoint")
  const dispatch =useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const option = optionRef.current.value;

    const expensesArray = {
      amount: amount,
      description: description,
      option: option,
    };

    console.log("this expense:", expensesArray);
    props.onAdd(expensesArray);
    amountRef.current.value = " ";
    descriptionRef.current.value = " ";
    optionRef.current.value = " ";

    const response = await fetch(
      `https://react-1ee49-default-rtdb.firebaseio.com/${email}/expense.json`,
      {
        method: "POST",
        body: JSON.stringify(expensesArray),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.name);

      const severItem = { ...expensesArray, id:data.name };
      dispatch(addExpense(severItem));
  
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
