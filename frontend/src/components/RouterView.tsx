import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthState } from "../redux/reducer";

import {
  Bartering,
  BarteringDetail,
  BarteringWrite,
  ChatRoom,
  Chat,
  Signin,
  Signup,
  Info,
  Test,
  Loading,
  BarteringUpdate
} from "../router";

import "../style/routerview.scss";
import { setPath } from "redux/action";

const RouterView = () => {
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const dispatch = useDispatch();

  const routerSwich = (path: string) => {
    console.log(path);
    switch (path) {
      case "/Info":
        return <Route path={path} component={Info} />;
      case "/BarteringWrite":
        return <Route path={path} component={BarteringWrite} />;
      case "/ChatRoom":
        return <Route path={path} component={ChatRoom}></Route>;
      case "/Signin":
        return <Route path={path} component={Signin}></Route>;
      case "/BarteringUpdate":
        return <Route path={path} component={BarteringUpdate}></Route>;
      default:
        return <Route path={path} component={Chat}></Route>;
    }
  };

  const PrivateRoute = (children: any) => {
    dispatch(setPath(children.location.pathname));

    return (
      <>{auth ? routerSwich(children.path) : <Redirect to="/Loading" />}</>
    );
  };

  return (
    <>
      <Switch>
        <Route path="/Home" component={Bartering}></Route>
        <Route path="/Signin" component={Signin}></Route>
        <Route path="/Signup" component={Signup}></Route>

        <PrivateRoute path="/Info" />
        <PrivateRoute path="/BarteringWrite" />
        <PrivateRoute path="/BarteringUpdate" />
        <PrivateRoute path="/ChatRoom" />
        <PrivateRoute path="/Chat/:id" />
        {/* <Route path="/Chat/:id" component={Chat}></Route> */}

        <Route path="/BarteringDetail/:id" component={BarteringDetail}></Route>
        <Route path="/Loading" component={Loading}></Route>
        <Route path="/Test" component={Test}></Route>
        <Redirect path="*" to="/Home" />
      </Switch>
    </>
  );
};

export default RouterView;
