import { initState } from "./initState";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    loginFetchStart(state) {
      state.loading = true;
    },
    loginFetchSucess(state, action) {
      state.loading = false;
      state.data = action.payload;
      window.localStorage.setItem("data", action.payload);
      state.error = null;
    },
    loginFetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { loginFetchStart, loginFetchSucess, loginFetchError } =
  slice.actions;

export const fetchToken = (user) => async (dispatch) => {
  if (user) {
    try {
      const url = "https://dogsapi.origamid.dev/json/jwt-auth/v1/token";
      dispatch(loginFetchStart());
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

        const data = await resp.json();
        
        console.log(data);
        
      if (!data?.message) {
        return dispatch(loginFetchSucess(data));
      } else {
        return dispatch(loginFetchError(data?.message));
      }
    } catch (error) {
      return dispatch(loginFetchError(error.message));
    }
  }
};

export default slice.reducer;
