import React, { Fragment, useState } from "react";
import Expenses from "./ExpenseForm";
import ExpensesItem from "./ExpensesItem";
const Expense = (props) => {
  const [expenses, setExpense] = useState([]);
  const addExpense = (expense) => {
    setExpense((pre) => {
      return [expense, ...pre];
    });
  };
  const products = expenses.map((expense) => (
    <ExpensesItem
      key={expense.id}
      id={expense.id}
      amount={expense.amount}
      description={expense.description}
      option={expense.option}
    />
  ));


  const tableHeaderStyle = {
    backgroundColor: "#007BFF", 
    color: "white", 
    padding: "10px", 
    textAlign: "center", 
    border: "1px solid #ddd", 
    justifyContent: "space-between"
  };
  return (
    <Fragment>
      <Expenses onAdd={addExpense} />

      <table style={{ width: "100%", borderCollapse: "collapse", }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Amount </th>
            <th style={tableHeaderStyle}>description</th>
            <th style={tableHeaderStyle}>Category</th>
          </tr>
        </thead>
      </table>
      {products}
    </Fragment>
  );
};

export default Expense;
