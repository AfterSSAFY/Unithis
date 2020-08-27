import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./barteringWrapper.scss";
import http, { imageURL } from "../../api/http-common";

export const BarteringWrapper = (props: any) => {
  const [nickName, setNickName] = useState<string>();
  let history = useHistory();

  useEffect(() => {
    if (props["item"]) {
      http
        .get("/user/" + props["item"]["userId"])
        .then(({ data }) => {
          setNickName(data["nickname"]);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

  const backwardMovement = () => {
    history.goBack();
  };

  return (
    <div className="bartering-detail-wrapper">
      <div className="image-area">
        <div className="iamge-prev-btn" onClick={backwardMovement}>
          &#x2190;
        </div>
        <img
          src={props["item"] && imageURL + props["item"]["images"][0]}
          alt="barteringImage"
        />
      </div>
      <div className="bartering-detail-description-area">
        <div className="bartering-detail-profile">
          <img
            className="bartering-detail-profile-icon"
            src={require("../../assets/icon/profile.png")}
            alt="profile"
          />
          <div>
            <div>{nickName && nickName}</div>
            <div className="bartering-detail-address">
              {props["item"] && props["item"]["address"]}
            </div>
          </div>
        </div>
        <hr />
        <div className="bartering-detail-content">
          <div className="bartering-detail-title">
            {props["item"] && props["item"]["title"]}
          </div>
          <div className="bartering-detail-category">
            {props["item"] && props["item"]["category"]}
          </div>
          <div className="bartering-detail-date">
            {props["item"] && props["item"]["date"]}
          </div>
          <div className="bartering-detail-substance">
            {props["item"] && props["item"]["contents"]}
          </div>
        </div>
      </div>
    </div>
  );
};
