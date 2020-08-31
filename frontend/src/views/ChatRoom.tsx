import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../api/http-common";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/action";
import jwt_decode from "jwt-decode";

import Nav from "../components/Nav";
import "../style/chatroom.scss";
import { chatRoom } from "react-app-env";

export const ChatRoom = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [room, setRoom] = useState<Array<chatRoom>>([]);

  const token: any = localStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    localStorage.setItem("nowPath", "/ChatRoom");

    if (decodedToken && decodedToken.id) {
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

  const onChatHandle = (
    user1Id: number,
    user2Id: number,
    otherUserNickname: string
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
            user2Id: user2Id
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
            room.map((r, i) => {
              return (
                <div key={"room" + i}>
                  <div
                    className="chat-room-content"
                    onClick={() =>
                      onChatHandle(
                        r.currUserId,
                        r.otherUserId,
                        r.entity.otherUserNickname
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
