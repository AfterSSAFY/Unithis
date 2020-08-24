import { Action_Auth, Action_Token } from "react-app-env";
import { setAuth } from "./action";
import http from "axios";

export interface AuthState {
  auth: boolean;
}

export interface TokenState {
  token: string;
}

const initstate = {
  auth: false,
  token: ""
};

export const authReducer = (
  state: AuthState = initstate,
  action: Action_Auth | Action_Token
) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };

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
  const token = await http
    .get(
      "https://raw.githubusercontent.com/joshua1988/doit-vuejs/master/data/demo.json"
      // localStorage.getItem("token")
    )
    .then(({ data }) => data)
    .catch(e => e);
  alert(JSON.stringify(token));
  dispatch(setAuth(true));
};
