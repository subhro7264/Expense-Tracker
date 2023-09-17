import React, { Fragment } from "react";

const ExpensesItem = (props) => {

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
   <table style={{ width: "100%", borderCollapse: "collapse", margin:"2rem" }}>
  <thead>
    <tr>
      <th style={tableHeaderStyle}>
        <h3>{props.amount}</h3>
      </th>
      <th style={tableHeaderStyle}>
        <h3>{props.description}</h3>
      </th>
      <th style={tableHeaderStyle}>
        <h3>{props.option}</h3>
      </th>
    </tr>
  </thead>
</table>

    </Fragment>
  );
};

export default ExpensesItem;
