import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Nav from "../components/Nav";

import { AddressList } from "components/Bartering/AddressList";
import { BarteringList } from "components/Bartering/BarteringList";
import { SearchForm } from "components/Bartering/SearchForm";
import { Bartering_List } from "react-app-env";

import http from "../api/http-common";
import jwt_decode from "jwt-decode";

const Bartering = () => {
  const [itemList, setItemList] = useState<Array<Bartering_List>>();
  const token: any = localStorage.getItem("token");
  const decodedToken = token ? jwt_decode(token) : null;

  useEffect(() => {
    http
      .get("/items")
      .then(({ data }) => {
        console.log(data);
        setItemList(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const BarteringItem = token ? { itemList, decodedToken } : { itemList };
  return (
    <>
      <Header />
      <section className="router-container router-header router-footer">
        <SearchForm />
        <AddressList />
        <BarteringList props={BarteringItem} />
      </section>
      <Nav />
    </>
  );
};

export default Bartering;
