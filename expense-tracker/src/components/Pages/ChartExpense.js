import React from "react";

import BarChart from "./BarChart";

const ExpenseChart = () => {
  return (
    <div style={{background:'#FE7F2D', borderRadius:'10px'}}>
      <h2>Expense Chart</h2>
       <BarChart />
    </div>
  );
};

export default ExpenseChart;
