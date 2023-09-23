import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import expensesReducer from './expenses';
import actionReducer from './action';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense:expensesReducer,
    action:actionReducer,
  },
});

export default store;