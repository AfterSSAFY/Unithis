import React from "react";
import { useHistory } from "react-router-dom";
import { imageURL } from "api/http-common";

export const Header = (props: any) => {
  let history = useHistory();

  const onClose = () => {
    history.push("/ChatRoom");
  };

  return (
    <>
      <article className="chat-header">
        {props.location.state.userProfile !== null && (
          <div>
            <img
              className="chat-profile-icon"
              src={imageURL + props.location.state.userProfile}
              alt="profile"
            />
          </div>
        )}
        <div>{props.location.state.userNickname}</div>
      </article>
      <article className="chat-header-close" onClick={onClose}>
        &#xd7;
      </article>
    </>
  );
};
