import React, { useState, useEffect } from "react";

import { address } from "utils/address";
import "./addressList.scss";

export const AddressList = (props: any) => {
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
    const dom = document.querySelectorAll(".address-village-active");
    let arr: any = [];
    Array.from(dom).forEach(v => {
      arr.push(v.innerHTML);
    });
    setvillage(arr);
  };

  useEffect(() => {
    if (village.length !== 0) {
      props.onAddress(village);
    }
  }, [village]);

  return (
    <div className="address-list-content none">
      {
        <ul className="address-list">
          {Object.keys(address).map((c, i) => {
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
      }
      {city &&
        city.map(v => {
          return (
            <div key={v}>
              <ul className="address-list">
                {Object.keys(Object.values(address)[Number(v)]).map((c, i) => {
                  return (
                    <li value={i} key={c} onClick={townClick}>
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      {town &&
        town.map((v, i) => {
          return (
            <div key={i}>
              {v.map(v2 => {
                return (
                  <div key={v2}>
                    <ul className="address-list">
                      {String(
                        Object.values(Object.values(address)[Number(city[i])])[
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
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
