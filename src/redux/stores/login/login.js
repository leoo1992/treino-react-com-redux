import { initState } from "./initState";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    //TOKEN
    fetchStartToken({ token }) {
      token.loading = true;
    },
    fetchSucessToken({ token }, action) {
      token.loading = false;
      token.data = action.payload;
      window.localStorage.setItem("token", action.payload);
      token.error = null;
    },
    fetchErrorToken({ token }, action) {
      token.loading = false;
      token.data = null;
      token.error = action.payload;
    },
    //USER
    fetchStartUser({ user }) {
      user.loading = true;
    },
    fetchSucessUser({ user }, action) {
      user.loading = false;
      user.data = action.payload;
      window.localStorage.setItem("user", action.payload);
      user.error = null;
    },
    fetchErrorUser({ user }, action) {
      user.loading = false;
      user.data = null;
      user.error = action.payload;
    },
  },
});

export const fetchToken = (user) => async (dispatch) => {
  if (user) {
    try {
      const url = "https://dogsapi.origamid.dev/json/jwt-auth/v1/token";
      dispatch(fetchStartToken());
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await resp.json();

      if (!data?.message) {
        return dispatch(fetchSucessToken(data));
      } else {
        return dispatch(fetchErrorToken(data?.message));
      }
    } catch (error) {
      return dispatch(fetchErrorToken(error.message));
    }
  }
};

export const fetchUser = (token) => async (dispatch) => {
  if (token) {
    try {
      const url = "https://dogsapi.origamid.dev/json/api/user";
      dispatch(fetchStartUser());
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await resp.json();

      if (!data?.message) {
        return dispatch(fetchSucessUser(data));
      } else {
        return dispatch(fetchErrorUser(data?.message));
      }
    } catch (error) {
      return dispatch(fetchErrorUser(error.message));
    }
  }
};

export const login = (user) => async (dispatch) => {
  if (user) {
    try {
      const { payload } = await dispatch(fetchToken(user));
      if (payload?.token) {
        await dispatch(fetchUser(payload.token));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const {
  fetchStartToken,
  fetchSucessToken,
  fetchErrorToken,
  fetchStartUser,
  fetchSucessUser,
  fetchErrorUser,
} = slice.actions;

export default slice.reducer;
