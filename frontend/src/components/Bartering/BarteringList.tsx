import React from "react";
import { Link } from "react-router-dom";
import { itemList, photoList, userList } from "../../utils/data";

export const BarteringList = () => {
  return (
    <>
      {itemList.map((item: any, i: any) => {
        return (
          <article className="bartering-list-article" key={item.title + i}>
            <Link to={"/BarteringDetail/" + i}>
              <div className="bartering-list-content">
                <img
                  className="bartering-list-photo"
                  src={photoList[i].image}
                  alt={item.title}
                />
                <div className="bartering-list-description">
                  <div>{item.title}</div>
                  <div className="bartering-list-description-location">
                    {userList[item.user_id - 1].address}
                  </div>
                  <div className="bartering-list-description-price">
                    {item.need}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </>
  );
};
