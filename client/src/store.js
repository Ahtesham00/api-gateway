import { configureStore } from '@reduxjs/toolkit';

// Example reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Configure the store
const store = configureStore({
  reducer: {
    counter: counterReducer, // Add more reducers as needed
  },
});

export default store;
