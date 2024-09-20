import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contador from "./stores/contador/contador";
import modal from "./stores/modal/modal";
import login from "./stores/login/login";
import logger from "./middlewares/logger";
import localStorage from "./middlewares/localStorage";

const reducer = combineReducers({ contador, modal, login });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, localStorage),
});

export default store;
