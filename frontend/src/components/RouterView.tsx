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
  Loading
} from "../router";

import "../style/routerview.scss";
import { setPath } from "redux/action";

const RouterView = () => {
  const routerSwich = (path: string, pramPath: string) => {
    switch (path) {
      case "/Info":
        return <Route path={path} component={Info} />;
      case "/BarteringWrite":
        return <Route path={path} component={BarteringWrite} />;
      case "/ChatRoom":
        return <Route path={path} component={ChatRoom}></Route>;
      default:
        return <Route path={path} component={Chat}></Route>;
    }
  };

  const dispatch = useDispatch();

  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const PrivateRoute = (children: any) => {
    dispatch(setPath(children.location.pathname));

    return (
      <>
        {auth ? (
          routerSwich(children.path, children.location.pathname)
        ) : (
          <Redirect to="/Loading" />
        )}
      </>
    );
  };

  return (
    <>
      <Switch>
        <Route exact path="/Home" component={Bartering}></Route>
        <Route path="/Signin" component={Signin}></Route>
        <Route path="/Signup" component={Signup}></Route>

        <PrivateRoute path="/Info" />
        <PrivateRoute path="/BarteringWrite" />
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
