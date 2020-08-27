import React, { useEffect, useState } from "react";
import http from "../api/http-common";
import { Message } from "react-app-env";

const Chat = (props: any) => {
  useEffect(() => {
    // console.log(props);
    const roomId = props.match.params.id;
    if (roomId) {
      http
        .get("/chat/room/message/" + roomId)
        .then(({ data }) => {
          setMessage(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props.match.params.id]);

  const [message, setMessage] = useState<Array<Message>>([]);

  return (
    <>
      <h1>{props.match.params.id}번방 채팅</h1>
      {message &&
        message.map(v => {
          return <div key={v.id}>{v.content}</div>;
        })}
      <div></div>
    </>
  );
};

export default Chat;
