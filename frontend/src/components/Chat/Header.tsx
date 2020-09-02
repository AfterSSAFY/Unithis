import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { OtherUserState } from "redux/reducer";

export const Header = (props: any) => {
  let history = useHistory();

  const other_user: any = useSelector<
    OtherUserState,
    OtherUserState["otherUser"]
  >(state => state.otherUser);

  const onClose = () => {
    history.push("/ChatRoom");
  };

  return (
    <>
      <article className="chat-header">{other_user}</article>
      <article className="chat-header-close" onClick={onClose}>
        &#xd7;
      </article>
    </>
  );
};
