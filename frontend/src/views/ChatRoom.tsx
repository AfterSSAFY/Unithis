import React, { useEffect, useState } from "react";
import http from "api/http-common";
import jwt_decode from "jwt-decode";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOtherUser } from "redux/action";
import { chatRoom } from "react-app-env";
import { Nav } from "components/Nav";

import "components/Chat/chatroom.scss";

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

export const ChatRoom = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [room, setRoom] = useState<Array<chatRoom>>([]);

  const token: any = sessionStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    sessionStorage.setItem("nowPath", "/ChatRoom");

    if (decodedToken && decodedToken.id) {
      connect();
      http
        .get("/chat/rooms/" + decodedToken.id)
        .then(({ data }) => {
          setRoom(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, []);

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
        setRoom(data);
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

  const onChatHandle = (
    user1Id: number,
    user2Id: number,
    otherUserNickname: string,
    otherUserProfile: string
  ) => {
    dispatch(setOtherUser(otherUserNickname));
    http
      .post("/chat/room", {
        user1Id: user1Id,
        user2Id: user2Id
      })
      .then(({ data }) => {
        history.push({
          pathname: "/Chat/" + data,
          state: {
            user1Id: user1Id,
            user2Id: user2Id,
            userNickname: otherUserNickname,
            userProfile: otherUserProfile
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="chat-header-wrapper">
        <span>채 팅 목 록</span>
      </div>

      <section className="router-container router-chat-header router-footer">
        <div className="chat-room-wrapper">
          {room &&
            room.map(r => {
              return (
                <div key={r.id}>
                  <div
                    className="chat-room-content"
                    onClick={() =>
                      onChatHandle(
                        r.currUserId,
                        r.otherUserId,
                        r.entity.otherUserNickname,
                        r.entity.otherUserProfile
                      )
                    }
                  >
                    <div className="chat-room-content-profile">
                      <div>{r.entity.otherUserNickname}</div>
                      <div className="chat-room-content-profile-message">
                        {r.entity.recentMessage}
                      </div>
                    </div>
                    {r.entity.unreadMessage !== 0 && (
                      <div className="chat-room-content-unreadMessage">
                        {r.entity.unreadMessage}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <Nav />
    </>
  );
};

export default ChatRoom;
