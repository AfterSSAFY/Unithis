import {
  Action_Auth,
  Action_Token,
  Action_UserID,
  Action_Path,
  Action_OtherUser
} from "react-app-env";

export const setAuth = (auth: boolean): Action_Auth => ({
  type: "SET_AUTH",
  payload: auth
});

export const setToken = (token: string): Action_Token => ({
  type: "SET_TOKEN",
  payload: token
});

export const setUserID = (userID: number): Action_UserID => ({
  type: "SET_USERID",
  payload: userID
});

export const setPath = (path: string): Action_Path => ({
  type: "SET_PATH",
  payload: path
});

export const setOtherUser = (otherUser: string): Action_OtherUser => ({
  type: "SET_OTHERUSER",
  payload: otherUser
});
