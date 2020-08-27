import {
  Action_Auth,
  Action_Token,
  Action_UserID,
  Action_Path
} from "react-app-env";
import { setAuth, setUserID, setToken } from "./action";

import http from "../api/http-common";

export interface AuthState {
  auth: boolean;
}

export interface TokenState {
  token: string;
}

export interface UserIDState {
  userID: number;
}

export interface PathState {
  path: string;
}

const initstate = {
  auth: false,
  token: "",
  userID: -1,
  path: ""
};

export const authReducer = (
  state: AuthState = initstate,
  action: Action_Auth | Action_Token | Action_UserID | Action_Path
) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USERID":
      return { ...state, userID: action.payload };
    case "SET_PATH":
      return { ...state, path: action.payload };
    default:
      return state;
  }
};

// export const setToken = () => async (dispatch: any, getState: any) => {
//   const token = JSON.stringify(getState());
//   await http
//     .get(
//       "https://raw.githubusercontent.com/joshua1988/doit-vuejs/master/data/demo.json"
//       // localStorage.getItem("token")
//     )
//     .then(({ data }) => {
//       console.log(data);
//     })
//     .catch(e => {
//       console.log(e);
//     });
//   alert("success : " + token);
// };

export const getToken = () => async (dispatch: any, getState: any) => {
  const token: any = localStorage.getItem("token");
  const userID = await http
    .post("/token", token)
    .then(({ data }) => {
      dispatch(setAuth(true));
      return data;
    })
    .catch(e => {
      dispatch(setToken(""));
      dispatch(setAuth(false));
      dispatch(setUserID(-1));
      if (e.request.status === 403) {
        console.log("Token Error : 토큰시간이 만료");
      } else {
        console.log("Token Error : ", e.request.status, " 토큰 검증 에러");
      }
      return e;
    });
  dispatch(setUserID(userID));

  // console.log(JSON.stringify(userID));
};
