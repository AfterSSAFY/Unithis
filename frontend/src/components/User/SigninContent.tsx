import React, { useEffect, useRef, ChangeEvent } from "react";

export const SigninContent = (props: any) => {
  const stayRef = useRef<HTMLInputElement>(null);
  const storageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("email") && storageRef.current) {
      props.setState(String(sessionStorage.getItem("email")), "email");
      storageRef.current.checked = true;
    }
  }, []);

  const onStayLoginHandle = () => {
    if (stayRef.current && stayRef.current.checked) {
      sessionStorage.setItem("stayLogin", "true");
    } else {
      sessionStorage.removeItem("stayLogin");
    }
  };

  const onStorageIDHandle = () => {
    if (storageRef.current && !storageRef.current.checked) {
      sessionStorage.removeItem("email");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      if (storageRef.current && storageRef.current.checked) {
        sessionStorage.setItem("email", e.target.value);
      }
      props.setState(e.target.value, "email");
    } else {
      props.setState(e.target.value, "password");
    }
  };

  return (
    <>
      <div className="user-input-area">
        <label>이메일</label>
        <input
          className="email"
          type="email"
          required
          value={props["item"]["email"]}
          onChange={handleChange}
        />
      </div>
      <div className="user-input-area">
        <label>비밀번호</label>
        <input
          className="password"
          type="password"
          required
          value={props["item"]["password"]}
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
    </>
  );
};
