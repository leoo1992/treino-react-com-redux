import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "contador",
  initialState: 0,
  reducers: {
    contadorAdd: (state) => parseInt(state) + 1,
    contadorDel: (state) => parseInt(state) - 1,
    somar: {
      reducer: (state, action) => parseInt(state) + parseInt(action.payload),
      prepare: (payload) => ({ payload: parseInt(payload), meta: "local" }),
    },
  },
});

export const { contadorAdd, contadorDel, somar } = slice.actions;
export default slice.reducer;
