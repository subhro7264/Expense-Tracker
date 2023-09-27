import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  isActive: false, 
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    activatePremium(state) {
      state.isActive = true;
    },
    addExpense(state, action) {
      state.items.push(action.payload);
      state.totalAmount = state.totalAmount + Number(action.payload.amount);
      console.log('total Amount',action.payload.amount)
    },

    removeExpense(state, action) {
      const id = action.payload;
      const reqIndex = state.items.findIndex((item) => item.id === id);
      state.totalAmount -= Number(state.items[reqIndex].amount);
      state.items.splice(reqIndex, 1);
    },
    editExpense(state, action) {
      const id = action.payload.id;
      const reqIndex = state.items.findIndex((item) => item.id === id);
      if (reqIndex !== -1) {
        state.totalAmount =
          state.totalAmount -
          Number(state.items[reqIndex].amount) +
          Number(action.payload.amount);
        state.items[reqIndex] = { ...action.payload.item, id: id };
      }
    },
    updateTotal(state, action) {
      state.totalAmount = Number(action.payload);
    },
    initialExpenses(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  addExpense,
  removeExpense,
  editExpense,
  updateTotal,
  initialExpenses,
  activatePremium,
} = expenseSlice.actions;

export default expenseSlice.reducer;
