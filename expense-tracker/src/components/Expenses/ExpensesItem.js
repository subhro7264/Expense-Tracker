import React, { Fragment, useEffect, useState, useCallback } from "react";

const ExpensesItem = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await fetch(`https://react-1ee49-default-rtdb.firebaseio.com/expense/${id}.json`, {
        method: "DELETE",
      });

      // Remove the deleted expense from the state
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id) => {
    // Set the editId state to trigger edit mode for a specific expense
    setEditId(id);
  };

  const handleSaveEdit = async (editedExpense) => {
    try {
      await fetch(`https://react-1ee49-default-rtdb.firebaseio.com/expense/${editedExpense.id}.json`, {
        method: "PUT",
        body: JSON.stringify(editedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update the edited expense in the state
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense.id === editedExpense.id ? editedExpense : expense))
      );

      // Reset edit mode
      setEditId(null);
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  return (
    <Fragment>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Amount</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>Option</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={tableHeaderStyle}>
                {editId === expense.id ? (
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => handleSaveEdit({ ...expense, amount: Number(e.target.value) })}
                  />
                ) : (
                  expense.amount
                )}
              </td>
              <td style={tableHeaderStyle}>
                {editId === expense.id ? (
                  <input
                    type="text"
                    value={expense.description}
                    onChange={(e) => handleSaveEdit({ ...expense, description: e.target.value })}
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td style={tableHeaderStyle}>
                {editId === expense.id ? (
                  <input
                    type="text"
                    value={expense.option}
                    onChange={(e) => handleSaveEdit({ ...expense, option: e.target.value })}
                  />
                ) : (
                  expense.option
                )}
              </td>
              <td style={tableHeaderStyle}>
                {editId === expense.id ? (
                  <button onClick={() => handleSaveEdit(expense)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(expense.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ExpensesItem;
