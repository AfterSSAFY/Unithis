import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { setToken, setAuth, setPath } from "../redux/action";
import { AuthState, PathState } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";

import http from "../api/http-common";

import "../style/user.scss";

const Signin = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const path = useSelector<PathState, PathState["path"]>(state => state.path);

  const stayRef = useRef<HTMLInputElement>(null);
  const storageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (auth && localStorage.getItem("stayLogin")) {
      history.push(path);
    }
    if (localStorage.getItem("email") && storageRef.current) {
      setEmail(String(localStorage.getItem("email")));
      storageRef.current.checked = true;
    }
  }, []);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    http
      .post("/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        dispatch(setToken(data));
        dispatch(setPath("/Home"));
        dispatch(setAuth(true));
        localStorage.setItem("token", data);

        history.push("/Loading");
      })
      .catch(e => {
        alert(e);
        dispatch(setToken(""));
        dispatch(setAuth(false));
        console.log(e.response.data);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      if (storageRef.current && storageRef.current.checked) {
        localStorage.setItem("email", e.target.value);
      }
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onStayLoginHandle = () => {
    if (stayRef.current && stayRef.current.checked) {
      localStorage.setItem("stayLogin", "true");
    } else {
      localStorage.removeItem("stayLogin");
    }
  };

  const onStorageIDHandle = () => {
    if (storageRef.current && !storageRef.current.checked) {
      localStorage.removeItem("email");
    }
  };

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
              <div className="user-input-area">
                <label>이메일</label>
                <input
                  className="email"
                  type="email"
                  required
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="user-input-area">
                <label>비밀번호</label>
                <input
                  className="password"
                  type="password"
                  // required
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox-area">
                <label>
                  <input
                    type="checkbox"
                    value="아이디저장"
                    ref={storageRef}
                    onClick={onStorageIDHandle}
                  />
                  아이디저장
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="로그인상태유지"
                    ref={stayRef}
                    onClick={onStayLoginHandle}
                  />
                  로그인상태유지
                </label>
              </div>
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
