import React, { useState, useRef } from "react";

export const MessageInput = (props: any) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = (e: any) => {
    if (props["stompClient"] && messageInput !== "") {
      const chatMessage = {
        senderId: Number(props.location.state.user1Id),
        receiverId: Number(props.location.state.user2Id),
        content: messageInput,
        sendTime: new Date(),
        receiveTime: null,
        chatroomId: Number(props.match.path.split("/")[2])
      };

      props["stompClient"].send(
        "/pub/message",
        {},
        JSON.stringify(chatMessage)
      );
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
    <>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="메세지를 입력해주세요."
          value={messageInput}
          ref={messageRef}
          onChange={onChangeMessageHandler}
        />
        <button className="btn blue rounded">전송</button>
      </form>
    </>
  );
};
