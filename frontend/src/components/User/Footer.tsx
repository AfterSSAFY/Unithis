import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setAuth } from "redux/action";

export const Footer = (props: any) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const logout = () => {
    dispatch(setToken(""));
    dispatch(setAuth(false));

    sessionStorage.removeItem("token");
    history.push("/Signin");
  };

  const updateInfo = (e: any) => {
    props.setState(1, "submitFlag");
  };

  const deleteInfo = (e: any) => {
    props.setState(2, "submitFlag");

    let userSelection = window.confirm("정말 삭제하시겠습니까?");

    if (userSelection) {
    }
  };

  return (
    <>
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
    </>
  );
};
