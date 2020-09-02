import React from "react";

export const DetailContent = (props: any) => {
  return (
    <>
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
    </>
  );
};
