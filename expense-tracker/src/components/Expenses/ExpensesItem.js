import React, { Fragment, useEffect, useState, useCallback } from "react";

const ExpensesItem = (props) => {
  const [expenses, setExpenses] = useState([]);

  const tableHeaderStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
    justifyContent: "space-between"
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://react-1ee49-default-rtdb.firebaseio.com/expense.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data) {
        // Convert the Firebase response into an array
        const expensesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(expensesArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "2rem" }}>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={tableHeaderStyle}>{expense.amount}</td>
              <td style={tableHeaderStyle}>{expense.description}</td>
              <td style={tableHeaderStyle}>{expense.option}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ExpensesItem;
