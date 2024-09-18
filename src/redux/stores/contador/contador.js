import { initState } from "./initState";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "contador",
  initialState: initState,
  reducers: {
    contadorAdd(state) {
      state.total++;
    },
    contadorDel(state) {
      state.total--;
    },
  },
});

export const { contadorAdd, contadorDel } = slice.actions;
export default slice.reducer;
