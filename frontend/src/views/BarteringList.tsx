import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Nav from "../components/Nav";

import "../style/barteringList.scss";

import { barteringList } from "../utils/data";

const BarteringList = () => {
  return (
    <>
      <section className="router-section">
        <Header />
        {barteringList.map((list, i) => {
          return (
            <article className="bartering-list-article" key={list.name + i}>
              <Link to={"/BarteringDetail/" + i}>
                <div className="bartering-list-content">
                  <img
                    className="bartering-list-photo"
                    src={list.photo}
                    alt={list.name}
                  />
                  <div className="bartering-list-description">
                    <div>{list.name}</div>
                    <div className="bartering-list-description-location">
                      {list.location}
                    </div>
                    <div className="bartering-list-description-price">
                      {list.price}
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
