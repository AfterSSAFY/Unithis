import React from "react";

import { itemList, userList, photoList } from "../../utils/data";

export const BarteringBody = (props: any) => {
  return (
    <div className="barteringBody">
      <div className="image-wrap">
        <div className="iamge-prev-btn">&#x2190;</div>
        <img
          src={photoList[props.match.params.id].image}
          alt="barteringImage"
        />
      </div>
      <div className="barteringDataDescription">
        <div className="barteringDataProfile">
          <img
            className="barteringDataProfileIcon"
            src={require("../../assets/icon/profile.png")}
            alt="profile"
          />
          <div>
            <div>{userList[props.match.params.id].nickname}</div>
            <div className="barteringDataAddrea">{userList[0].address}</div>
          </div>
        </div>
        <hr />
        <div className="barteringDataHeader">
          <div className="barteringTitle">
            {itemList[props.match.params.id].title}
          </div>
          <div className="barteringCategory">
            {itemList[props.match.params.id].category}
          </div>
          <div className="barteringDate">
            {itemList[props.match.params.id].date}
          </div>
          <div className="barteringContent">
            {itemList[props.match.params.id].contents}
          </div>
        </div>
      </div>
    </div>
  );
};
