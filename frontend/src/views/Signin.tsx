import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import http from "../api/http-common";

import "../style/signin.scss";

import { userList } from "../utils/data";

const Signin = () => {
  useEffect(() => {
    console.log("Signin");
    console.log(userList);
  }, []);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    http
      .post("/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        console.log(data);
        http
          .post("/token", data)
          .then(({ data }) => {
            console.log(data);
          })
          .catch(e => {
            console.log(e);
            console.log(e.response.data);
          });
      })
      .catch(e => {
        console.log(e);
        console.log(e.response.data);
      });
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
      <section className="signin-Content">
        <div className="signin-Form">
          <div className="signin-Box">
            <Link to={"/Home"}>
              <div className="touring">둘러보기</div>
            </Link>
            <div>
              <h2 className="signin-title">Unithis</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputForm">
                <label>이메일</label>
                <input
                  className="email"
                  type="email"
                  required
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="inputForm">
                <label>비밀번호</label>
                <input
                  className="password"
                  type="password"
                  required
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox-content">
                <label>
                  <input type="checkbox" value="아이디저장" />
                  아이디저장
                </label>
                <label>
                  <input type="checkbox" value="로그인상태유지" />
                  로그인상태유지
                </label>
              </div>
              <div className="btn-content">
                <input type="submit" className="btn blue" value="로그인" />
              </div>
            </form>
            <div className="otherLink">
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
