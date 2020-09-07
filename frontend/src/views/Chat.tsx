import React, { useEffect, useState } from "react";
import http from "api/http-common";
import jwt_decode from "jwt-decode";

import { Header } from "components/Chat/Header";
import { useHistory } from "react-router-dom";
import { Message } from "react-app-env";
import { MessageContent } from "components/Chat/MessageContent";
import { MessageInput } from "components/Chat/MessageInput";
import "components/Chat/chat.scss";

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

const Chat = (props: any) => {
  let history = useHistory();

  const token: any = sessionStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  const [message, setMessage] = useState<Array<Message>>([]);
  const [reciveMessage, setReciveMessage] = useState<Message>();

  useEffect(() => {
    if (props.location.state === undefined) {
      history.push("/ChatRoom");
    } else {
      connect();
    }
  }, []);

  useEffect(() => {
    const roomId =
      props.match.path.split("/")[2] === ":id"
        ? props.location.pathname.split("/")[2]
        : props.match.path.split("/")[2];

    if (roomId) {
      // 그동안 메세지 출력
      http.get("/chat/room/message/" + roomId).then(({ data }) => {
        console.log(data);
        if (data.length !== 10) {
          setMessage(data);
        } else {
          setMessage(data.reverse());
        }
      });

      http
        .patch("/chat/message", {
          id: roomId,
          userId: decodedToken.id
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

  useEffect(() => {
    const element = document.querySelector(".router-container");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [message]);

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
    stompClient.debug = null;
  };

  const onMessageReceived = (payload: any) => {
    setReciveMessage(JSON.parse(payload.body));
    http
      .patch("/chat/message", {
        id: props.match.path.split("/")[2],
        userId: props.location.state.user1Id
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/sub/" + props.location.state.user1Id,
      onMessageReceived
    );
  };

  const onError = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <section className="router-container router-top router-chat-footer">
        <Header {...props} />
        <MessageContent token={decodedToken} message={message} />
      </section>
      <section className="message-send-container">
        <MessageInput stompClient={stompClient} {...props} />
      </section>
    </>
  );
};

export default Chat;
