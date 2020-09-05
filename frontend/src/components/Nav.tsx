import React, { useEffect, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

import http from "api/http-common";

import "style/nav.scss";

declare global {
  interface Window {
    SockJS: any;
    Stomp: any;
  }
}

const SockJS = window.SockJS;
const Stomp = window.Stomp;
let socket: any = null;
let stompClient: any = null;
socket = new SockJS("http://13.124.102.51:8080/ws");

export const Nav = memo(() => {
  const [unreadMessage, setUnreadMessage] = useState<number>(0);
  const token: any = sessionStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    if (decodedToken) {
      connect();
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
  }, [decodedToken]);

  const connect = () => {
    socket = new SockJS("http://13.124.102.51:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    stompClient.debug = null;
  };

  const onMessageReceived = (payload: any) => {
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
  };

  const onConnected = () => {
    stompClient.subscribe("/sub/" + decodedToken.id, onMessageReceived);
  };

  const onError = (e: any) => {
    console.log(e);
  };

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
            {unreadMessage !== 0 && <div>{unreadMessage}</div>}
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
});
