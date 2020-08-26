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
  }, []);

  const RouterView = () => {
    switch (path) {
      case "/Info":
        return <Redirect to="/Info" />;
      case "/BarteringWrite":
        return <Redirect to="/BarteringWrite" />;
      case "/ChatRoom":
        return <Redirect to="/ChatRoom" />;
      case "/Chat/:id":
        return <Redirect to="/Chat/:id" />;
      default:
        break;
    }
  };

  return <>{auth ? RouterView() : <Signin />}</>;
};

export default Loading;
