import React from "react";
import { useHistory } from "react-router-dom";

export const Header = (props: any) => {
  let history = useHistory();

  const close = () => {
    history.push("/Home");
  };

  return (
    <>
      <div className="write-header-wrap">
        <span className="close" onClick={close}>
          X
        </span>
        <span>{props["title"]}</span>
        <input type="submit" value="완료" />
      </div>
    </>
  );
};
