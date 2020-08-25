import React, { useEffect, useState } from "react";
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
  Loading
} from "../router";

import "../style/routerview.scss";

const RouterView = () => {
  const routerSwich = (path: string) => {
    console.log(path);
    switch (path) {
      case "/Info":
        return <Route path={path} component={Info} />;
      case "/BarteringWrite":
        return <Route path={path} component={BarteringWrite} />;
      case "/ChatRoom":
        return <Route path={path} component={ChatRoom}></Route>;
      case "/Chat/:id":
        return <Route path="/Chat/:id" component={Chat}></Route>;
      default:
        break;
    }
  };

  const dispatch = useDispatch();

  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const PrivateRoute = (children: any, ...props: any) => {
    // const data = getToken();
    // data.then(v => {
    //   console.log("ㅇㅇ", v.data);
    //   if (v.data === "" || v.data === undefined) {
    //     console.log("false");
    //     setAuth(false);
    //   } else {
    //     console.log("true");
    //     setAuth(true);
    //   }
    // });
    return <>{true ? routerSwich(children.path) : <Redirect to="/Signin" />}</>;
  };

  return (
    <>
      <Switch>
        <Route exact path="/Home" component={Bartering}></Route>
        <Route path="/Signin" component={Signin}></Route>
        <Route path="/Signup" component={Signup}></Route>
        {/* {auth ? (
          <Route path="/Info" component={Signup}></Route>
        ) : (
          <Redirect to="/Signin" />
        )} */}

        <PrivateRoute path="/Info" />
        <PrivateRoute path="/BarteringWrite" />
        <PrivateRoute path="/ChatRoom" />
        <PrivateRoute path="/Chat/:id" />

        {/* <Route path="/ChatRoom/:id" component={Chat}></Route> */}
        <Route path="/BarteringDetail/:id" component={BarteringDetail}></Route>
        <Route path="/loading" component={Loading} data={"/Info"}></Route>
        <Redirect path="*" to="/Home" />
      </Switch>
    </>
  );
};

export default RouterView;
