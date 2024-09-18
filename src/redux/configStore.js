import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contador from "./stores/contador/contador";
import modal from "./stores/modal/modal";
import login from "./stores/login/login";
import logger from "./middlewares/logger";

const reducer = combineReducers({ contador, modal, login });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
