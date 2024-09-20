import createAsyncSlice from "../../helper/createAsyncSlice";
import getLocalStorage from "../../helper/getLocalStorage";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    data: getLocalStorage("token"),
  },
  reducers: {
    fetchSucess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: "token",
              value: payload,
            },
          },
        };
      },
    },
  },
  fetchConfig: (user) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  }),
});

export default token;
