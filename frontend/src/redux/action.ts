import { Action_Auth, Action_Token } from "react-app-env";

export const setAuth = (auth: boolean): Action_Auth => ({
  type: "SET_AUTH",
  payload: auth
});

export const setToken = (token: string): Action_Token => ({
  type: "SET_TOKEN",
  payload: token
});
