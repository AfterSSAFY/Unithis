import React, { ChangeEvent } from "react";

export const SignupContent = (props: any) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.className === "email") {
      props.setState(e.target.value, "email");
    } else if (e.target.className === "password") {
      props.setState(e.target.value, "password");
    } else if (e.target.className === "repassword") {
      props.setState(e.target.value, "repassword");
    } else if (e.target.className === "nickName") {
      props.setState(e.target.value, "nickName");
    } else if (e.target.className === "phone") {
      props.setState(e.target.value, "phone");
    } else {
      return;
    }
  };

  return (
    <>
      <div className="user-input-area">
        <label>이메일</label>
        <input
          className="email"
          type="email"
          placeholder="user@unithis.com"
          value={props["item"]["email"]}
          onChange={handleChange}
          required
        />
      </div>
      <div className="user-input-area">
        <label>닉네임</label>
        <input
          className="nickName"
          type="text"
          placeholder="닉네임"
          value={props["item"]["nickname"]}
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
          value={props["item"]["password"]}
          onChange={handleChange}
          required
        />
      </div>
      <div className="user-input-area">
        <label>비밀번호 확인</label>
        <input
          className="repassword"
          type="password"
          placeholder="비밀번호 확인"
          value={props["item"]["repassword"]}
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
          value={props["item"]["phone"]}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
};
