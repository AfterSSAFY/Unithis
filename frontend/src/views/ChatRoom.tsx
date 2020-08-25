import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";
import "../style/chatroom.scss";

export const ChatRoom = () => {
  useEffect(() => {
    const data = [
      "1번방",
      "2번방",
      "3번방",
      "4번방",
      "5번방",
      "6번방",
      "7번방",
      "8번방",
      "9번방",
      "10번방",
      "11번방",
      "12번방",
      "13번방"
    ];
    setRoom(data);
  }, []);

  const [room, setRoom] = useState<Array<string>>([]);

  return (
    <>
      <section className="router-container router-chat-header router-footer">
        <div className="chat-header-wrapper">
          <span>채 팅 목 록</span>
        </div>
        <div className="chat-room-wrapper">
          {room.map((r, i) => {
            return (
              <div key={"room" + i}>
                <Link to={"/Chat/" + i}>
                  <div className="chat-room-content">{r}</div>
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
