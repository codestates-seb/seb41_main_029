import { createSlice } from "@reduxjs/toolkit";

const initialState = { image: "aa" };
const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    setImage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;
