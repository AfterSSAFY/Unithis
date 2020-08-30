import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

import http from "../api/http-common";

import "../style/nav.scss";

const Nav = () => {
  const [unreadMessage, setUnreadMessage] = useState<number>();
  const token: any = localStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    if (decodedToken.id !== -1) {
      http
        .get("/chat/rooms/" + decodedToken.id)
        .then(({ data }) => {
          const message = data.reduce((message: number, acc: any) => {
            message += acc.entity.unreadMessage;
            return message;
          }, 0);
          setUnreadMessage(message);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, []);
  return (
    <>
      <nav className="sign">
        <ul className="nav__navigation">
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              to="/Home"
              activeClassName="active"
              replace
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              to="/BarteringWrite"
              activeClassName="active"
              replace
            >
              상품등록
            </NavLink>
          </li>
          <li className="chat-area">
            <NavLink
              className="nav__naviagtion--nav-text chat-area-absolute"
              to="/ChatRoom"
              replace
            >
              채팅하기
            </NavLink>
            <div>{unreadMessage}</div>
          </li>
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              to="/Info"
              activeClassName="active"
              replace
            >
              My
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
