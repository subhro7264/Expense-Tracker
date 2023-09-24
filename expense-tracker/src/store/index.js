import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import expensesReducer from './expenses';
import themeReducer  from './action';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense:expensesReducer,
    theme:themeReducer ,
  },
});

export default store;