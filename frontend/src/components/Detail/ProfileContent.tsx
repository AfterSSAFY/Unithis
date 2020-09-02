import React, { useEffect, useState } from "react";
import http from "api/http-common";

import { useDispatch } from "react-redux";
import { setOtherUser } from "redux/action";

export const ProfileContent = (props: any) => {
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState<string>();

  useEffect(() => {
    if (props["item"]) {
      http
        .get("/user/" + props["item"]["userId"])
        .then(({ data }) => {
          setNickName(data["nickname"]);
          dispatch(setOtherUser(data["nickname"]));
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

  return (
    <>
      <div className="bartering-detail-profile">
        <img
          className="bartering-detail-profile-icon"
          src={require("assets/icon/profile.png")}
          alt="profile"
        />
        <div>
          <div>{nickName}</div>
          <div className="bartering-detail-address">
            {props["item"] && props["item"]["address"]}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
