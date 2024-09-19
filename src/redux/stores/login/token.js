import createAsyncSlice from "../../helper/createAsyncSlice";

const token = createAsyncSlice({
  name: "token",
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
