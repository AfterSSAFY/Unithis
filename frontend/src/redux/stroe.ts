import { createStore, applyMiddleware } from "redux";
import { authReducer } from "./reducer";
import ReduxThunk from "redux-thunk";
import loggerMiddleware from "./loggerMiddleware";

// export const store = createStore(
//   authReducer,
//   applyMiddleware(logger, ReduxThunk)
// );

export const store = createStore(
  authReducer,
  applyMiddleware(loggerMiddleware, ReduxThunk)
);
