import React, { useEffect, useRef } from "react";
import { AuthState, getToken } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, useHistory } from "react-router";
import { Signin } from "../router/index";
const Loading = (component: any, ...props: any) => {
  let history = useHistory();
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    console.log(divRef.current);
    // if (divRef.current !== null) {
    //   history.push("/Signin");
    // }
  }, [divRef]);

  const getAuth = () => {
    dispatch(getToken());
  };

  return (
    <>
      {auth ? (
        <Redirect to="/Info" />
      ) : (
        // <Route path="/Signin" component={Signin}></Route>
        <Signin />
      )}
    </>
  );
};

export default Loading;
