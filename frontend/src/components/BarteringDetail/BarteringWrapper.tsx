import React from "react";

import { itemList, userList, photoList } from "../../utils/data";
import "./barteringWrapper.scss";

export const BarteringWrapper = (props: any) => {
  return (
    <div className="bartering-detail-wrapper">
      <div className="image-area">
        <div className="iamge-prev-btn">&#x2190;</div>
        <img
          src={photoList[props.match.params.id].image}
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
            <div>{userList[props.match.params.id].nickname}</div>
            <div className="bartering-detail-address">
              {userList[0].address}
            </div>
          </div>
        </div>
        <hr />
        <div className="bartering-detail-content">
          <div className="bartering-detail-title">
            {itemList[props.match.params.id].title}
          </div>
          <div className="bartering-detail-category">
            {itemList[props.match.params.id].category}
          </div>
          <div className="bartering-detail-date">
            {itemList[props.match.params.id].date}
          </div>
          <div className="bartering-detail-substance">
            {itemList[props.match.params.id].contents}
          </div>
        </div>
      </div>
    </div>
  );
};
