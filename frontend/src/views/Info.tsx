import React, { useState, useEffect, ChangeEvent } from "react";
import jwt_decode from "jwt-decode";

import { useHistory } from "react-router-dom";
import { address } from "../utils/address";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setAuth, setUserID } from "../redux/action";
import { UserIDState } from "../redux/reducer";

import Nav from "../components/Nav";
import http from "../api/http-common";

const Info = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    const decodedToken: any = jwt_decode(token);

    setEmail(String(Object.values(decodedToken)[0]));
    setNickname(String(Object.values(decodedToken)[2]));
    setPhone(String(Object.values(decodedToken)[3]));
    const Address_split = String(Object.values(decodedToken)[4]).split(" ");

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
      .findIndex(v =>
        blankFlag
          ? new RegExp(Address_split[3]).test(v)
          : new RegExp(Address_split[2]).test(v)
      );

    setCity(시도);
    setTown(구군);
    setVillage(읍면동);
    setAddress1(Object.keys(address)[시도]);
    setAddress2(Object.keys(Object.values(address)[시도])[구군]);
    setAddress3(
      String(Object.values(Object.values(address)[시도])[구군]).split(",")[
        읍면동
      ]
    );
  }, []);

  const user_id: any = useSelector<UserIDState, UserIDState["userID"]>(
    state => state.userID
  );

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
  const [submitFlag, setSubmitFlag] = useState<number>(0);

  const [imagePreview, setImagePreview] = useState<string>(
    require("../assets/icon/profile.png")
  );

  const [uploadFile, setUploadFile] = useState<File>();

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
    console.log(e.target);
    console.log(
      "id :",
      user_id,
      "\npassword :",
      password,
      "\nnickname :",
      nickname,
      "\naddress :",
      address1 + " " + address2 + " " + address3,
      "\nphone :",
      phone
    );

    if (submitFlag === 1) {
      http
        .patch("/user/" + user_id, {
          email: email,
          password: password,
          nickname: nickname,
          address: address1 + " " + address2 + " " + address3,
          phone: phone
        })
        .then(({ data }) => {
          dispatch(setToken(data));
          dispatch(setAuth(true));
          localStorage.setItem("token", data);
          history.push("/Home");
        })
        .catch(e => {
          console.log(e);
          console.log(e.response.data);
        });
    } else if (submitFlag === 2) {
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
      setVillage(0);
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
    dispatch(setUserID(-1));

    localStorage.removeItem("token");
    history.push("/Signin");
  };

  useEffect(() => {
    if (uploadFile) {
      let formData = new FormData();
      formData.append("userId", user_id);
      formData.append("image", uploadFile);
      http
        .patch("/user/profile/" + user_id, formData, {
          headers: {
            "Content-Type": "multipart/form-data; charset=utf-8",
            Accept: "application/json"
          }
        })
        .then(({ data }) => {
          alert("등록완료!");
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [uploadFile]);

  const onProfileImageDeleteHandle = () => {
    setUploadFile(undefined);
    setImagePreview(require("../assets/icon/profile.png"));
    http
      .delete("/user/profile/" + user_id)
      .then(({ data }) => {
        alert("삭제완료!");
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const loadFile = (e: any) => {
    const file = e.target.files;
    setImagePreview(URL.createObjectURL(file[0]));
    setUploadFile(file[0]);
  };

  const updateInfo = () => {
    setSubmitFlag(1);
  };
  const deleteInfo = (e: any) => {
    e.preventDefault();
    setSubmitFlag(2);
    let userSelection = window.confirm("정말 삭제하시겠습니까?");

    if (userSelection) {
      http
        .delete("/user/" + user_id)
        .then(({ data }) => {
          dispatch(setToken(""));
          dispatch(setAuth(false));
          localStorage.removeItem("token");
          history.push("/Signin");
        })
        .catch(e => {
          console.log(e);
          console.log(e.response.data);
        });
    }
  };

  return (
    <>
      <section className="user-container">
        <div className="user-wrapper">
          <div className="user-content">
            <div className="user-title-area">
              <h2 className="user-title">회원 정보</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="user-profile-area">
                <div className="user-profile-image-area">
                  <label>
                    <img
                      className="user-profile-image"
                      src={imagePreview}
                      alt="profile"
                    />
                    <img
                      className="user-profile-camera"
                      src={require("../assets/icon/profile_camera.png")}
                      alt="profile"
                    />

                    <input
                      type="file"
                      onChange={loadFile}
                      accept=".gif, .jpg, .png, .jpeg"
                    />
                  </label>
                  {uploadFile && (
                    <img
                      className="user-profile-delete"
                      src={require("../assets/icon/delete.png")}
                      alt="profile"
                      onClick={onProfileImageDeleteHandle}
                    />
                  )}
                </div>
                <p>{email}</p>
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
                <input
                  type="submit"
                  className="btn blue"
                  onClick={updateInfo}
                  value="정보수정"
                />
                <input
                  type="submit"
                  className="btn red"
                  onClick={deleteInfo}
                  value="회원탈퇴"
                />
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
