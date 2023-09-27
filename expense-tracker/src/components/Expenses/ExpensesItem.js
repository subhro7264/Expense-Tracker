import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { initialExpenses, updateTotal, editExpense, removeExpense, } from "../../store/expenses";
import { Button } from "react-bootstrap";
const ExpensesItem = () => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const email = localStorage.getItem("endpoint");
  const dispatch = useDispatch();
  const tableHeaderStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
    justifyContent: "space-between",
  };

  /*------------------------------------>GET DATA FROM FIREBASE<---------------------------------------- */

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://react-1ee49-default-rtdb.firebaseio.com/${email}/expense.json`
      );

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
        const prices = expensesArray.map((item) => item.amount);
        const initialTotal = prices.reduce((pre, cur) => {
          return +pre + +cur;
        }, 0);
        setExpenses(expensesArray);
      
        dispatch(initialExpenses(expensesArray)); 
        dispatch(updateTotal(initialTotal));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /*------------------------------------>DELETE DATA FROM FIREBASE<---------------------------------------- */
  const handleDelete = async (id) => {
    try {
      const resp = await fetch(
        `https://react-1ee49-default-rtdb.firebaseio.com/${email}/expense/${id}.json`,
        {
          method: "DELETE",
        }
      );

      // Remove the deleted expense from the state
      if (resp.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
        dispatch(removeExpense(id));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id) => {
    // Set the editId state to trigger edit mode for a specific expense
    setEditId(id);
  };

  /*------------------------------------>EDIT DATA FROM FIREBASE<---------------------------------------- */

  const handleSaveEdit = async (editedExpense) => {
    try {
      const resp = await fetch(
        `https://react-1ee49-default-rtdb.firebaseio.com/${email}/expense/${editedExpense.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(editedExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the edited expense in the state
      if (resp.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editedExpense.id ? editedExpense : expense
          )
        );
        dispatch(editExpense(editedExpense)); 
    
      }
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
                  <input type="number" value={expense.amount} onChange={(e) =>handleSaveEdit({ ...expense,
                    amount: Number(e.target.value), 
                      })
                    }
                    onBlur={() => setEditId(null)}
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
                    onChange={(e) =>
                      handleSaveEdit({
                        ...expense,
                        description: e.target.value,
                      })
                    }
                    onBlur={() => setEditId(null)}
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
                    onChange={(e) =>
                      handleSaveEdit({
                        ...expense,
                        option: e.target.value,
                      })
                    }
                    onBlur={() => setEditId(null)}
                  />
                ) : (
                  expense.option
                )}
              </td>
              <td style={tableHeaderStyle}>
                {editId === expense.id ? (
                  <>
                    <Button  variant="success" onClick={() => handleSaveEdit(expense)}>
                      Save
                    </Button>
                    <Button   variant="warning" onClick={() => setEditId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button variant="warning" onClick={() => handleEdit(expense.id)}>Edit</Button>
                  </>
                )}
                <Button variant="danger"  onClick={() => handleDelete(expense.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ExpensesItem;
