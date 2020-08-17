import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Address } from "../utils/address";

import Header from "../components/Header";
import Nav from "../components/Nav";

import "../style/barteringList.scss";

import { barteringList, photoList, userList } from "../utils/data";

const BarteringList = () => {
  const [city, setCity] = useState<Array<string>>([]);
  const [town, setTown] = useState<Array<Array<string>>>([[]]);
  const [village, setvillage] = useState([]);

  const cityClick = (e: any) => {
    e.target.classList.toggle("address-city-active");
    const dom = document.querySelectorAll(".address-city-active");
    let arr: Array<string> = [];
    Array.from(dom).map(v => arr.push(String(v.getAttribute("value"))));
    setCity(arr);
  };

  const townClick = (e: any) => {
    e.target.classList.toggle("address-town-active");
    const list = document.querySelectorAll(".address-list");
    let arr: Array<Array<string>> = [[]];
    for (let i = 1; i < list.length; i++) {
      const dom = list[i].querySelectorAll(".address-town-active");
      arr[i - 1] = [];
      Array.from(dom).map(v =>
        arr[i - 1].push(String(v.getAttribute("value")))
      );
      setTown(arr);
    }
  };

  const villageClick = (e: any) => {
    e.target.classList.toggle("address-village-active");
    let arr: any = [...village];
    arr.push(String(e.target.innerText));
    setvillage(arr);
  };

  return (
    <>
      <Header />
      <section className="router-section header-footer">
        {village}
        {
          <>
            <ul className="address-list">
              {Object.keys(Address).map((c, i) => {
                return (
                  <li
                    className="address-list-text"
                    value={i}
                    onClick={cityClick}
                    key={c}
                  >
                    {c}
                  </li>
                );
              })}
            </ul>
            <hr></hr>
          </>
        }
        {city.map(v => {
          return (
            <div key={v}>
              <ul className="address-list">
                {Object.keys(Object.values(Address)[Number(v)]).map((c, i) => {
                  return (
                    <li value={i} key={c} onClick={townClick}>
                      {c}
                    </li>
                  );
                })}
              </ul>
              <hr></hr>
            </div>
          );
        })}
        {town.map((v, i) => {
          return (
            <div key={i}>
              {v.map(v2 => {
                return (
                  <div key={v2}>
                    <ul className="address-list">
                      {String(
                        Object.values(Object.values(Address)[Number(city[i])])[
                          Number(v2)
                        ]
                      )
                        .split(",")
                        .map(c => {
                          return (
                            <li key={c} onClick={villageClick}>
                              {c}
                            </li>
                          );
                        })}
                    </ul>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          );
        })}

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
      </section>
      <Nav />
    </>
  );
};

export default BarteringList;
