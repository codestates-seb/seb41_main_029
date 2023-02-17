import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersReducer";
import imageReducer from "./imageReducer";

const store = configureStore({
  reducer: {
    currentUser: userReducer,
    image: imageReducer,
  },
});

export default store;
