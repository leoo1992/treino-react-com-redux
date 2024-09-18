import { initState } from "./initState";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "modal",
  initialState: initState,
  reducers: {
    modalOpen(state) {
      state.open = true;
    },
    modalClose(state) {
      state.open = false;
    },
  },
});

export const { modalOpen, modalClose } = slice.actions;
export default slice.reducer;
