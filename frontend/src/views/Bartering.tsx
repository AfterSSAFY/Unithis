import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Nav from "../components/Nav";

import { AddressList } from "components/Bartering/AddressList";
import { BarteringList } from "components/Bartering/BarteringList";

import http from "../api/http-common";
import jwt_decode from "jwt-decode";

import { Bartering_List } from "react-app-env";

const Bartering = () => {
  const [itemList, setItemList] = useState<Array<Bartering_List>>();
  const token: any = localStorage.getItem("token");
  const decodedToken: any = jwt_decode(token);

  useEffect(() => {
    http
      .get("/items")
      .then(({ data }) => {
        // console.log(data);
        setItemList(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  // console.log(item);

  const BarteringItem = { itemList, decodedToken };
  return (
    <>
      <Header />
      <section className="router-container router-header router-footer">
        <AddressList />
        <BarteringList props={BarteringItem} />
      </section>
      <Nav />
    </>
  );
};

export default Bartering;
