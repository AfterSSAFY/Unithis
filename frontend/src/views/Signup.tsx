import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Address } from "../utils/address";
import http from "../api/http-common";

import "../style/modal.scss";
const Signup = () => {
  // let 시군구 = "";
  // let 시도 = "";
  // let 읍면동 = "";

  useEffect(() => {
    // const 시 = Object.keys(Address);
    // const 도 = Object.values(Address);
    // for (let i = 0; i < 1; i++) {
    //   console.log(시[i]);
    //   const 시군구 = Object.keys(도[i]);
    //   const 읍면동 = Object.values(도[i]);
    //   for (let j = 0; j < 3; j++) {
    //     console.log("\t", 시군구[j]);
    //     const arr = String(읍면동[j]).split(",");
    //     arr.map(v => {
    //       console.log("\t\t", v);
    //     });
    //   }
    // }
  }, []);

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (password !== repassword) {
      alert("입력하신 비밀번호가 맞지 않습니다.");
      return;
    }

    console.log(
      "email :",
      email,
      "\npassword :",
      password,
      "\nrepasseord :",
      repassword,
      "\nname :",
      nickname,
      "\naddress :",
      address1 + " " + address2 + " " + address3,
      "\nphone :",
      phone
    );

    http
      .post("/join", {
        email: email,
        password: password,
        nickname: nickname,
        address: address1 + " " + address2 + " " + address3,
        phone: phone
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState(-1);
  const [town, setTown] = useState(-1);
  const [village, setVillage] = useState(-1);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.className === "email") {
      setEmail(e.target.value);
    }
    if (e.target.className === "password") {
      setPassword(e.target.value);
    }
    if (e.target.className === "repassword") {
      setRepassword(e.target.value);
    }
    if (e.target.className === "name") {
      setNickname(e.target.value);
    }
    if (e.target.className === "phone") {
      setPhone(e.target.value);
    } else {
      return;
    }
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
      setAddress1(Object.keys(Address)[e.target.value]);
      setAddress2(Object.keys(Object.values(Address)[e.target.value])[0]);
      setAddress3(
        String(Object.values(Object.values(Address)[0])[0]).split(",")[0]
      );
    } else if (e.target.className === "구/군") {
      setTown(e.target.value);
    } else if (e.target.className === "읍/면/동") {
      setVillage(e.target.value);
    } else {
      return;
    }
  };
  return (
    <>
      <section className="signin-Content">
        <div className="signin-Form">
          <div className="signin-Box">
            <div>
              <h2 className="signin-title">Unithis</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputForm">
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
              <div className="inputForm">
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
              <div className="inputForm">
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
              <div className="inputForm">
                <label>비밀번호 확인</label>
                <input
                  className="repassword"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={repassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputForm">
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

              <div className="inputForm">
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
                        {Object.keys(Address).map((c, i) => {
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
                          {Object.keys(Object.values(Address)[city]).map(
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
                            Object.values(Object.values(Address)[city])[town]
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

              <div className="btn-content">
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
