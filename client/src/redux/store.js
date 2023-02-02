import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersReducer";

const store = configureStore({
  reducer: {
    currentUser: userReducer,
    // ,image:imageReducer
  },
});

export default store;
