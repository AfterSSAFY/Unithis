import React, { useEffect } from "react";
import "../style/signin.scss";

const Signin = () => {
  useEffect(() => {
    console.log("Signin");
  }, []);

  return (
    <>
      <section className="signin-Content">
        <div className="signin-Form">
          <div className="signin-Box">
            <div>
              <h2 className="signin-title">Unithis</h2>
            </div>
            <input
              className="email"
              type="email"
              placeholder="이메일을 입력해주세요."
            />
            <input
              className="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
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
              <button className="btn blue">로그인</button>
            </div>
            <div className="otherLink">
              <span>회원가입</span>
              <span>아이디찾기</span>
              <span>비밀번호찾기</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
