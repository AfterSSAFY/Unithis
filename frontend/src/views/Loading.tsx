import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthState, getToken, PathState } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
const Loading = () => {
  const dispatch = useDispatch();
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const path = useSelector<PathState, PathState["path"]>(state => state.path);

  let history = useHistory();

  useEffect(() => {
    dispatch(getToken());
  });

  useEffect(() => {
    const loarding = document.querySelector(".loarding");
    setTimeout(() => {
      if (loarding) {
        if (auth) {
          RouterView();
        } else {
          history.push("/Signin");
        }
      }
    }, 1000);
  });

  const RouterView = () => {
    if (path === "/Home") {
      return history.push("/Home");
    }
    return <Redirect to={path} />;
  };

  return <h1 className="loarding">로딩중...</h1>;
};

export default Loading;
