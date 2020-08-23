import React, { useEffect } from "react";
import Nav from "../components/Nav";
import "../style/chat.scss";

const Chat = () => {
  useEffect(() => {}, []);

  return (
    <>
      <section className="router-container router-top router-footer">
        <div className="chat-header-wrap">
          <span>채 팅</span>
        </div>
      </section>
      <Nav />
    </>
  );
};

export default Chat;
