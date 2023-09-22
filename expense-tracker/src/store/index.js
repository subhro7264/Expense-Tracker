import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import expensesReducer from './expenses';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense:expensesReducer,
  },
});

export default store;