import React, { useState, useEffect } from "react";
import http from "api/http-common";

import { Link, useHistory } from "react-router-dom";
import { setToken, setAuth } from "redux/action";
import { AuthState } from "redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { SigninContent } from "components/User/SigninContent";

import "components/User/body.scss";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);

  useEffect(() => {
    if (auth && localStorage.getItem("stayLogin")) {
      history.push(String(localStorage.getItem("nowPath")));
    }
  }, [auth]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    http
      .post("/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        dispatch(setToken(data));
        dispatch(setAuth(true));
        localStorage.setItem("token", data);

        history.push("/Loading");
      })
      .catch(e => {
        console.log(e);
        dispatch(setToken(""));
        dispatch(setAuth(false));
        if (e.request.status === 401) {
          alert("존재하지 않은 아이디 혹은 비밀번호가 틀립니다.");
        }
      });
  };

  const setState = (data: any, category: string) => {
    switch (category) {
      case "email":
        setEmail(data);
        break;
      case "password":
        setPassword(data);
        break;

      default:
        break;
    }
  };

  const item = { email, password };
  return (
    <>
      <section className="user-container">
        <div className="user-wrapper">
          <div className="user-content">
            <Link to={"/Home"}>
              <div className="touring">둘러보기</div>
            </Link>
            <div>
              <h2 className="user-title">Unithis</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <SigninContent setState={setState} item={item} />

              <div className="button-area">
                <input type="submit" className="btn blue" value="로그인" />
              </div>
            </form>
            <div className="user-link-area">
              <Link to={"/Signup"}>
                <span>회원가입</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
