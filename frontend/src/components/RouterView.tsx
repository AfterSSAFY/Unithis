import React from "react";
import {
  BarteringList,
  Test,
  BarteringDetail,
  Signin,
  Signup
} from "../router";
import { Route, Switch, Redirect } from "react-router-dom";

import "../style/routerview.scss";

const RouterView = () => {
  return (
    <>
      <Switch>
        {/* <Route path="/" component={BarteringList} replace></Route> */}
        <Route exact path="/Home" component={BarteringList}></Route>
        <Route path="/Test" component={Test}></Route>
        <Route path="/BarteringDetail/:id" component={BarteringDetail}></Route>
        <Route path="/Signin" component={Signin}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Redirect path="*" to="/Home" />
      </Switch>
    </>
  );
};

export default RouterView;
