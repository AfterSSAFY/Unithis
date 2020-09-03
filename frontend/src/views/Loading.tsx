import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthState, getToken, UserIDState } from "redux/reducer";
import { useSelector, useDispatch } from "react-redux";

const Loading = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const user_id = useSelector<UserIDState, UserIDState["userID"]>(
    state => state.userID
  );

  useEffect(() => {
    if (user_id !== -1) {
      if (user_id === -2) {
        history.push("/Signin");
      }

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        if (auth) {
          RouterView();
        } else {
          history.push("/Signin");
        }
      }, 1000);
    }
  });

  let timer: any;
  useEffect(() => {
    dispatch(getToken());
  });

  const RouterView = () => {
    return history.push(String(sessionStorage.getItem("nowPath")));
  };

  return <h1 className="loarding">로딩중...</h1>;
};

export default Loading;
