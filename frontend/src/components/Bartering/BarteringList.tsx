import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { itemList, photoList, userList } from "../../utils/data";
import "./barteringList.scss";
import { imageURL } from "../../api/http-common";
export const BarteringList = (props: any) => {
  useEffect(() => {
    console.log(props);
    console.log("itemList", props["props"]["itemList"]);
    console.log(itemList);
    console.log(decodedToken);
  });

  const itemList = props["props"]["itemList"];
  const decodedToken = props["props"]["decodedToken"];

  return (
    <>
      {itemList &&
        itemList.map((item: any, i: any) => {
          return (
            <article className="bartering-wrapper" key={item.title + i}>
              <Link to={"/BarteringDetail/" + i}>
                <div className="bartering-area">
                  <img
                    className="bartering-photo"
                    src={imageURL + item.images[0]}
                    alt={item.title}
                  />
                  <div className="bartering-description-content">
                    <div>{item.title}</div>
                    <div className="bartering-location">
                      {decodedToken.address}
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
