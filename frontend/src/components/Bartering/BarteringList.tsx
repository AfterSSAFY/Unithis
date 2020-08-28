import React from "react";
import { Link } from "react-router-dom";
import { imageURL } from "../../api/http-common";
import "./barteringList.scss";

export const BarteringList = (props: any) => {
  const itemList = props["props"]["itemList"];
  // const decodedToken = props["props"]["decodedToken"];

  return (
    <>
      {itemList &&
        itemList.map((item: any, i: any) => {
          return (
            <article className="bartering-wrapper" key={item.title + item.id}>
              <Link to={"/BarteringDetail/" + item.id}>
                <div className="bartering-area">
                  <div className="bartering-area-image">
                    {item.status === "대기중" && (
                      <div className="btn rounded blue status">
                        {item.status}
                      </div>
                    )}
                    {item.status === "거래중" && (
                      <div className="btn rounded red status">
                        {item.status}
                      </div>
                    )}
                    {item.status === "거래완료" && (
                      <div className="btn rounded dark-blue status">
                        {item.status}
                      </div>
                    )}

                    <img
                      className="bartering-photo"
                      src={imageURL + item.images[0]}
                      alt={item.title}
                    />
                  </div>
                  <div className="bartering-description-content">
                    <div>{item.title}</div>
                    <div className="bartering-location">
                      {item.address && item.address}
                    </div>
                    <div className="bartering-price">{item.need}</div>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
    </>
  );
};
