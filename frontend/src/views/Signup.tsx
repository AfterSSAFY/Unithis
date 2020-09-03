import React, { useState, useEffect } from "react";
import http from "api/http-common";
import { Link, useHistory } from "react-router-dom";
import { AuthState } from "redux/reducer";
import { useSelector } from "react-redux";

import { AddressFrom } from "components/User/AddressForm";
import { SignupContent } from "components/User/SignupContent";

const Signup = () => {
  let history = useHistory();
  const auth = useSelector<AuthState, AuthState["auth"]>(state => state.auth);

  useEffect(() => {
    if (auth) {
      if (sessionStorage.getItem("nowPath")) {
        history.push(String(sessionStorage.getItem("nowPath")));
      } else {
        history.push("/Home");
      }
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");

  const emailCheck = async () => {
    let status = 0;
    try {
      await http.get("/validation/email?email=" + email);
      // console.log("이메일 체크 성공");
      status = 1;
      await http.get("/validation/nickname?nickname=" + nickname);
      // console.log("닉네임 체크 성공");
      status = 2;
      return status;
    } catch (error) {
      return status;
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (password !== repassword) {
      alert("입력하신 비밀번호가 맞지 않습니다.");
      return;
    }

    emailCheck().then(v => {
      if (v === 0) {
        alert("이메일이 중복됩니다.");
      } else if (v === 1) {
        alert("닉네임이 중복됩니다.");
      } else if (v === 2) {
        http
          .post("/join", {
            email: email,
            password: password,
            nickname: nickname,
            address: address1 + " " + address2 + " " + address3,
            phone: phone
          })
          .then(({ data }) => {
            alert("가입 성공!");
            history.push("/Signin");
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  const setState = (data: any, category: string) => {
    switch (category) {
      case "Address1":
        setAddress1(data);
        break;
      case "Address2":
        setAddress2(data);
        break;
      case "Address3":
        setAddress3(data);
        break;
      case "email":
        setEmail(data);
        break;
      case "nickName":
        setNickname(data);
        break;
      case "password":
        setPassword(data);
        break;
      case "repassword":
        setRepassword(data);
        break;
      case "phone":
        setPhone(data);
        break;
      default:
        break;
    }
  };

  const item = { email, password, repassword, nickname, phone };
  return (
    <>
      <section className="user-container">
        <div className="user-wrapper">
          <div className="user-content">
            <div>
              <h2 className="user-title">Unithis</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <SignupContent item={item} setState={setState} />
              <AddressFrom setState={setState} />

              <div className="button-area">
                <input type="submit" className="btn blue" value="회원가입" />
              </div>
              <Link to={"/Signin"}>
                <span className="login-btn">로그인 하러 가기</span>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
