import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Nav from "../components/Nav";

import "../style/barteringList.scss";

import { barteringList, photoList, userList } from "../utils/data";

const BarteringList = () => {
  return (
    <>
      <section className="router-section">
        <Header />
        {barteringList.map((item, i) => {
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
        <Nav />
      </section>
    </>
  );
};

export default BarteringList;
