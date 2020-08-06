import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import "../style/modal.scss";
const Signup = () => {
  useEffect(() => {
    console.log("Signup");
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
      address + " " + detailAddress,
      "\nphone :",
      phone
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setdetailAddress] = useState("");

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
    if (e.target.className === "address") {
      setAddress(e.target.value);
    }
    if (e.target.className === "phone") {
      setPhone(e.target.value);
    }
    if (e.target.className === "detailAddress") {
      setdetailAddress(e.target.value);
    } else {
      return;
    }
  };

  const closeRef = useRef<HTMLDivElement | null>(null);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);

    if (closeRef && closeRef.current) {
      closeRef.current.style.zIndex = "0";
      closeRef.current.style.opacity = "0";
    }
  };

  const openPostalCodeSearch = (e: any) => {
    e.preventDefault();
    if (closeRef && closeRef.current) {
      closeRef.current.style.zIndex = "1001";
      closeRef.current.style.opacity = "1";
    }
  };

  const closeButtonClickEvent = () => {
    if (closeRef && closeRef.current) {
      closeRef.current.style.zIndex = "0";
      closeRef.current.style.opacity = "0";
    }
  };

  return (
    <>
      <div className="modal" ref={closeRef}>
        <div className="modal-content">
          <div className="close" onClick={closeButtonClickEvent}>
            X
          </div>
          <DaumPostcode onComplete={handleComplete} height="100%" />
        </div>
      </div>
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
                  <input
                    className="address-text"
                    type="text"
                    placeholder="주소"
                    value={address}
                    onChange={handleChange}
                    required
                  />
                  <div className="address-box">
                    <button
                      className="btn orange"
                      onClick={openPostalCodeSearch}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  className="detailAddress"
                  placeholder="상세주소"
                  value={detailAddress}
                  onChange={handleChange}
                />
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
