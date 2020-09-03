import React from "react";
import { imageURL } from "api/http-common";

export const ProfileContent = (props: any) => {
  return (
    <>
      <div className="bartering-detail-profile">
        {props["item"] && props["item"]["user"]["profile"] ? (
          <img
            className="bartering-detail-profile-icon"
            src={imageURL + props["item"]["user"]["profile"]}
            alt="profile"
          />
        ) : (
          <img
            className="bartering-detail-profile-icon"
            src={require("assets/icon/profile.png")}
            alt="profile"
          />
        )}

        <div>
          <div>{props["item"] && props["item"]["user"]["nickname"]}</div>
          <div className="bartering-detail-address">
            {props["item"] && props["item"]["address"]}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
