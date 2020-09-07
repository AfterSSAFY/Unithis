import React, { useState, useEffect } from "react";
import http from "api/http-common";
import jwt_decode from "jwt-decode";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setAuth } from "redux/action";
import { Profile } from "components/User/Profile";
import { AddressFrom } from "components/User/AddressForm";
import { InfoContent } from "components/User/InfoContent";
import { Footer } from "components/User/Footer";
import { Nav } from "components/Nav";

const Info = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const token: any = sessionStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    sessionStorage.setItem("nowPath", "/Info");
    setEmail(String(Object.values(decodedToken)[0]));
    setNickname(String(Object.values(decodedToken)[2]));
    setPhone(String(Object.values(decodedToken)[3]));
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [submitFlag, setSubmitFlag] = useState<number>(0);

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (submitFlag === 1) {
      getUpdateAPI();
    } else {
      getDeleteAPI();
    }
  };

  const getUpdateAPI = () => {
    http
      .patch("/user/" + decodedToken.id, {
        email: email,
        password: password,
        nickname: nickname,
        address: address1 + " " + address2 + " " + address3,
        phone: phone
      })
      .then(({ data }) => {
        alert("수정 완료!");
        dispatch(setToken(data));
        dispatch(setAuth(true));
        sessionStorage.setItem("token", data);
        history.push("/Home");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getDeleteAPI = () => {
    http
      .delete("/user/" + decodedToken.id)
      .then(({ data }) => {
        alert("삭제 완료!");
        dispatch(setToken(""));
        dispatch(setAuth(false));
        sessionStorage.removeItem("token");
        history.push("/Signin");
      })
      .catch(e => {
        console.log(e);
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
      case "nickName":
        setNickname(data);
        break;
      case "password":
        setPassword(data);
        break;
      case "phone":
        setPhone(data);
        break;
      case "submitFlag":
        setSubmitFlag(data);
        break;
      default:
        break;
    }
  };

  const item = { email, password, nickname, phone };

  return (
    <>
      <section className="user-container">
        <div className="user-wrapper">
          <div className="user-content">
            <div className="user-title-area">
              <h2 className="user-title">회원 정보</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <Profile token={decodedToken} email={email} setState={setState} />
              <InfoContent
                token={decodedToken}
                item={item}
                setState={setState}
              />

              <AddressFrom token={decodedToken} setState={setState} />

              <Footer setState={setState} />
            </form>
          </div>
        </div>
      </section>
      <Nav />
    </>
  );
};

export default Info;
