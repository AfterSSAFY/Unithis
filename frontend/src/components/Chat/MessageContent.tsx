import React from "react";

export const MessageContent = (props: any) => {
  return (
    <>
      <article className="chat-section">
        {props["message"].map((m: any, i: any) => {
          return (
            <span key={i}>
              {m.senderId !== props["token"].id ? (
                <div className="from-them">
                  <p>{m.content}</p>
                </div>
              ) : (
                <div className="from-me">
                  <p>{m.content}</p>
                </div>
              )}
              <div className="clear"></div>
            </span>
          );
        })}
      </article>
    </>
  );
};
