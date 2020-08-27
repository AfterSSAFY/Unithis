import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../api/http-common";
import { useSelector } from "react-redux";
import { UserIDState } from "../redux/reducer";

import Nav from "../components/Nav";
import "../style/chatroom.scss";
import { chatRoom } from "react-app-env";

export const ChatRoom = () => {
  const user_id: any = useSelector<UserIDState, UserIDState["userID"]>(
    state => state.userID
  );

  const [room, setRoom] = useState<Array<chatRoom>>([]);

  useEffect(() => {
    if (user_id !== -1) {
      http
        .get("/chat/rooms/" + user_id)
        .then(({ data }) => {
          setRoom(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [user_id]);

  return (
    <>
      <section className="router-container router-chat-header router-footer">
        <div className="chat-header-wrapper">
          <span>채 팅 목 록</span>
        </div>
        <div className="chat-room-wrapper">
          {room &&
            room.map((r, i) => {
              return (
                <div key={"room" + i}>
                  <Link to={"/Chat/" + r.id}>
                    <div className="chat-room-content">
                      {r.entity.otherUserNickname}
                    </div>
                  </Link>
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
