import React, { useEffect } from "react";
import { AuthState, getToken, PathState } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Signin } from "../router/index";

const Loading = () => {
  const dispatch = useDispatch();
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const path = useSelector<PathState, PathState["path"]>(state => state.path);

  useEffect(() => {
    dispatch(getToken());
  });

  const RouterView = () => {
    switch (path) {
      case "/Info":
        return <Redirect to={path} />;
      case "/BarteringWrite":
        return <Redirect to={path} />;
      case "/ChatRoom":
        return <Redirect to={path} />;
      default:
        return <Redirect to={path} />;
    }
  };

  return <>{auth ? RouterView() : <Signin />}</>;
};

export default Loading;
