import React from "react";
import { Link } from "react-router-dom";
import { itemList, photoList, userList } from "../../utils/data";
import "./barteringList.scss";

export const BarteringList = () => {
  return (
    <>
      {itemList.map((item: any, i: any) => {
        return (
          <article className="bartering-wrapper" key={item.title + i}>
            <Link to={"/BarteringDetail/" + i}>
              <div className="bartering-area">
                <img
                  className="bartering-photo"
                  src={photoList[i].image}
                  alt={item.title}
                />
                <div className="bartering-description-content">
                  <div>{item.title}</div>
                  <div className="bartering-location">
                    {userList[item.user_id - 1].address}
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
