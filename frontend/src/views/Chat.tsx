import React, { useEffect, useState, useRef } from "react";
import http from "../api/http-common";
import { Message } from "react-app-env";
import { useSelector } from "react-redux";
import { UserIDState, OtherUserState } from "../redux/reducer";

import "../style/chat.scss";

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

const Chat = (props: any) => {
  const other_user: any = useSelector<
    OtherUserState,
    OtherUserState["otherUser"]
  >(state => state.otherUser);

  const user_id: any = useSelector<UserIDState, UserIDState["userID"]>(
    state => state.userID
  );

  const [message, setMessage] = useState<Array<Message>>([]);
  const [reciveMessage, setReciveMessage] = useState<Message>();
  const [messageInput, setMessageInput] = useState<string>("");
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    console.log(props);
    console.log(props.location.state);
    console.log(props.location.state.user1Id);

    const roomId = props.match.params.id;
    if (roomId) {
      http
        .get("/chat/room/message/" + roomId)
        .then(({ data }) => {
          setMessage(data.reverse());
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

  useEffect(() => {
    let currentMessage = [...message];
    if (reciveMessage) {
      currentMessage.push(reciveMessage);
      setMessage(currentMessage);
    }
  }, [reciveMessage]);

  const connect = () => {
    socket = new SockJS("http://13.124.102.51:8080/ws");

    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
  };

  const onMessageReceived = (payload: any) => {
    setReciveMessage(JSON.parse(payload.body));
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/sub/" + props.location.state.user1Id,
      onMessageReceived
    );
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const sendMessage = (e: any) => {
    if (stompClient && messageInput !== "") {
      const chatMessage = {
        senderId: Number(props.location.state.user1Id),
        receiverId: Number(props.location.state.user2Id),
        content: messageInput,
        sendTime: new Date(),
        receiveTime: null,
        chatroomId: Number(props.match.params.id)
      };

      stompClient.send("/pub/message", {}, JSON.stringify(chatMessage));
    }
    setMessageInput("");
    if (messageRef.current) {
      messageRef.current.focus();
    }
    e.preventDefault();
  };

  const onChangeMessageHandler = (e: any) => {
    setMessageInput(e.target.value);
  };

  return (
    <section className="router-container router-top router-chat-footer">
      <article className="chat-header">{other_user}</article>
      <article className="chat-section">
        {message.map((m, i) => {
          return (
            <span key={i}>
              {m.senderId !== user_id ? (
                <div className="from-me">
                  <p>{m.content}</p>
                </div>
              ) : (
                <div className="from-them">
                  <p>{m.content}</p>
                </div>
              )}
              <div className="clear"></div>
            </span>
          );
        })}
      </article>
      <article className="message-send-container">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="메세지를 입력해주세요."
            value={messageInput}
            ref={messageRef}
            onChange={onChangeMessageHandler}
          />
          <button>전송</button>
        </form>
      </article>
    </section>
  );
};

export default Chat;
