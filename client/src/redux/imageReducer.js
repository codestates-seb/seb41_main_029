import { createSlice } from "@reduxjs/toolkit";

const initialState = { image: "" };
const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    setImage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setImage } = userSlice.actions;
export default imageSlice.reducer;
