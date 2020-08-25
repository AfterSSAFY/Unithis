import React, { useEffect, useState, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthState, TokenState } from "../redux/reducer";
import { setAuth, setToken } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../redux/reducer";

import { userList } from "../utils/data";

import http from "../api/http-common";

import "../style/user.scss";

const Signin = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);
  const token = useSelector<TokenState, TokenState["token"]>(
    state => state.token
  );

  useEffect(() => {
    console.log("Signin");
    console.log(userList);
  }, []);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    dispatch(setAuth(true));
    history.push("/Home");

    // http
    //   .post("/login", {
    //     email: email,
    //     password: password
    //   })
    //   .then(({ data }) => {
    //     console.log(data);
    //     localStorage.setItem("token", data);
    //     history.push("/Home");
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     console.log(e.response.data);
    //   });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <section className="user-container">
        <div className="user-wrapper">
          {`${auth}`}
          {token}
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
                  // required
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
                  <input type="checkbox" value="아이디저장" />
                  아이디저장
                </label>
                <label>
                  <input type="checkbox" value="로그인상태유지" />
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
