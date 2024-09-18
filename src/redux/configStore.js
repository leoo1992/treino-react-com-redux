import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contador from "./stores/contador/contador";
import modal from "./stores/modal/modal";
import logger from "./middlewares/logger";

const reducer = combineReducers({ contador, modal });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
