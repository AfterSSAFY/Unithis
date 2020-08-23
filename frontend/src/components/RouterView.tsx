import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  Bartering,
  BarteringDetail,
  BarteringWrite,
  Chat,
  Signin,
  Signup,
  Info
} from "../router";

import "../style/routerview.scss";

const auth = true;
const RouterView = () => {
  const routerSwich = (path: string) => {
    console.log(path);
    switch (path) {
      case "/Info":
        return <Route path={path} component={Info} />;
      case "/BarteringWrite":
        return <Route path={path} component={BarteringWrite} />;
      case "/Chat":
        return <Route path={path} component={Chat}></Route>;
      default:
        break;
    }
  };
  const PrivateRoute = (children: any, ...props: any) => {
    return <>{auth ? routerSwich(children.path) : <Redirect to="/Signin" />}</>;
  };

  return (
    <>
      <Switch>
        <Route exact path="/Home" component={Bartering}></Route>
        <Route path="/Signin" component={Signin}></Route>
        <Route path="/Signup" component={Signup}></Route>

        <PrivateRoute path="/Info" />
        <PrivateRoute path="/BarteringWrite" />
        <PrivateRoute path="/Chat" />

        <Route path="/BarteringDetail/:id" component={BarteringDetail}></Route>
        <Redirect path="*" to="/Home" />
      </Switch>
    </>
  );
};

export default RouterView;
