import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "redux/reducer";

import {
  Bartering,
  BarteringDetail,
  BarteringWrite,
  ChatRoom,
  Chat,
  Signin,
  Signup,
  Info,
  Loading,
  BarteringUpdate
} from "router";

import "style/routerview.scss";

const RouterView = () => {
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);

  const routerSwich = (path: string, pramPath: string) => {
    switch (path) {
      case "/Info":
        return <Route path={pramPath} component={Info} />;
      case "/BarteringWrite":
        return <Route path={pramPath} component={BarteringWrite} />;
      case "/ChatRoom":
        return <Route path={pramPath} component={ChatRoom}></Route>;
      case "/Signin":
        return <Route path={pramPath} component={Signin}></Route>;
      case "/BarteringUpdate/:id":
        return <Route path={pramPath} component={BarteringUpdate}></Route>;
      case "/Chat/:id":
        return <Route path={pramPath} component={Chat}></Route>;
      default:
        return;
    }
  };

  const PrivateRoute = (children: any) => {
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
        <Route path="/Home" component={Bartering}></Route>
        <Route path="/Signin" component={Signin}></Route>
        <Route path="/Signup" component={Signup}></Route>

        <PrivateRoute path="/Info" />
        <PrivateRoute path="/BarteringWrite" />
        <PrivateRoute path="/BarteringUpdate/:id" />
        <PrivateRoute path="/ChatRoom" />
        <PrivateRoute path="/Chat/:id" />
        {/* <Route path="/Chat/:id" component={Chat}></Route> */}

        <Route path="/BarteringDetail/:id" component={BarteringDetail}></Route>
        <Route path="/Loading" component={Loading}></Route>
        <Redirect path="*" to="/Home" />
      </Switch>
    </>
  );
};

export default RouterView;
