import React from "react";
import { BarteringList, Test } from "../router";
import { Route, Switch, Redirect } from "react-router-dom";

import "../style/routerview.scss";

const RouterView = () => {
  return (
    <>
      <section>
        <Switch>
          <Route path="/Home" component={BarteringList}></Route>
          <Route path="/Test" component={Test}></Route>
          <Redirect path="*" to="/Home" />
        </Switch>
      </section>
    </>
  );
};

export default RouterView;
