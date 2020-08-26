import React, { useState, useEffect, ChangeEvent } from "react";
import jwt_decode from "jwt-decode";

import { useHistory } from "react-router-dom";

import { address } from "../utils/address";
import { useSelector, useDispatch } from "react-redux";
import { UserIDState } from "../redux/reducer";
import { setToken, setAuth } from "../redux/action";

import http from "../api/http-common";
import Nav from "../components/Nav";

const Info = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  // const user_id: any = useSelector<UserIDState, UserIDState["userID"]>(
  //   state => state.userID
  // );

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    const decodedToken: any = jwt_decode(token);

    setEmail(String(Object.values(decodedToken)[0]));
    setNickname(String(Object.values(decodedToken)[2]));
    setPhone(String(Object.values(decodedToken)[3]));
    const Address_split = String(Object.values(decodedToken)[4]).split(" ");

    console.log(Address_split);
    const blankFlag = Address_split.length === 4;
    const 시도 = Object.keys(address).findIndex(v =>
      new RegExp(Address_split[0]).test(v)
    );

    const 구군 = Object.keys(Object.values(address)[시도]).findIndex(v =>
      blankFlag
        ? new RegExp(Address_split[1] + " " + Address_split[2]).test(v)
        : new RegExp(Address_split[1]).test(v)
    );
    const 읍면동 = String(Object.values(Object.values(address)[시도])[구군])
      .split(",")
      .findIndex(v => new RegExp(Address_split[Address_split.length - 1]));

    console.log(시도);
    console.log(구군);
    console.log(읍면동);
    setCity(시도);
    setTown(구군);
    setVillage(읍면동);
    // setAddress1("경기도");
    // setAddress2("성남시 분당구");
    // setAddress3("구미동");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState(1);
  const [town, setTown] = useState(1);
  const [village, setVillage] = useState(1);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.className === "email") {
      setEmail(e.target.value);
    } else if (e.target.className === "password") {
      setPassword(e.target.value);
    } else if (e.target.className === "name") {
      setNickname(e.target.value);
    } else if (e.target.className === "phone") {
      setPhone(e.target.value);
    } else {
      return;
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(
      "email :",
      email,
      "\npassword :",
      password,
      "\nname :",
      nickname,
      "\naddress :",
      address1 + " " + address2 + " " + address3,
      "\nphone :",
      phone
    );
  };

  const selectChange = (e: any) => {
    if (e.target.value === "") {
      setCity(-1);
      setTown(-1);
      setVillage(-1);
      return;
    }
    if (e.target.className === "시/도") {
      setCity(e.target.value);
      setTown(0);
      setAddress1(Object.keys(address)[e.target.value]);
      setAddress2(Object.keys(Object.values(address)[e.target.value])[0]);
      setAddress3(
        String(Object.values(Object.values(address)[0])[0]).split(",")[0]
      );
    } else if (e.target.className === "구/군") {
      setTown(e.target.value);
    } else if (e.target.className === "읍/면/동") {
      setVillage(e.target.value);
    } else {
      return;
    }
  };

  const logout = () => {
    dispatch(setToken(""));
    dispatch(setAuth(false));
    localStorage.removeItem("token");
    history.push("/Signin");

    console.log("logout");
  };

  return (
    <>
      <section className="user-container">
        <div className="user-wrapper">
          <div className="user-content">
            <div>
              <h2 className="user-title">회원 정보</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="user-input-area">
                <label>이메일</label>
                <input
                  className="email"
                  type="email"
                  placeholder="user@unithis.com"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-area">
                <label>닉네임</label>
                <input
                  className="name"
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-area">
                <label>비밀번호</label>

                <input
                  className="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-area">
                <label>전화번호</label>
                <input
                  className="phone"
                  type="tel"
                  placeholder="000-0000-0000"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  value={phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="user-input-area">
                <label>주소</label>
                <div className="address">
                  {
                    <>
                      <select
                        value={city}
                        onChange={selectChange}
                        className="시/도"
                      >
                        <option value="">시/도 선택</option>
                        {Object.keys(address).map((c, i) => {
                          return (
                            <option value={i} label={c} key={c + i}>
                              {c}
                            </option>
                          );
                        })}
                      </select>
                      {city === -1 ? (
                        <select>
                          <option value="">구/군 선택</option>
                        </select>
                      ) : (
                        <select
                          value={town}
                          name={address2}
                          onChange={selectChange}
                          className="구/군"
                        >
                          {Object.keys(Object.values(address)[city]).map(
                            (c, i) => {
                              return (
                                <option value={i} label={c} key={c + i}>
                                  {c}
                                </option>
                              );
                            }
                          )}
                        </select>
                      )}

                      {(city === -1 || town === -1) && village === -1 ? (
                        <select>
                          <option value="">읍/면/동 선택</option>
                        </select>
                      ) : (
                        <select
                          value={village}
                          name={address3}
                          onChange={selectChange}
                          className="읍/면/동"
                        >
                          {String(
                            Object.values(Object.values(address)[city])[town]
                          )
                            .split(",")
                            .map((c, i) => {
                              return (
                                <option value={i} label={c} key={c + i}>
                                  {c}
                                </option>
                              );
                            })}
                        </select>
                      )}
                    </>
                  }
                </div>
              </div>

              <div className="button-area">
                <input type="submit" className="btn blue" value="수정하기" />
              </div>
              <div className="user-link-area">
                <span onClick={logout}>로그아웃</span>
              </div>
              <div className="user-margin-bottem"></div>
            </form>
          </div>
        </div>
      </section>
      <Nav />
    </>
  );
};

export default Info;
