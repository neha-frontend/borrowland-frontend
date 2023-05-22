import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./saga";

import { authRootReducer, userRootReducer } from "./reducer";

// setup saga middleware
const sagaMiddleware = createSagaMiddleware();

// create root reducer
const rootReducer = {
  auth: authRootReducer,
  user: userRootReducer,
};

// setup store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV_STATUS !== "production",
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
