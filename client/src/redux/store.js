import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersReducer";

const store = configureStore({
  reducer: { currentUser: userReducer },
});

export default store;
