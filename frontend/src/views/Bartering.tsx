import React from "react";

import Header from "../components/Header";
import Nav from "../components/Nav";

import "../style/bartering.scss";
import { AddressList } from "components/Bartering/AddressList";
import { BarteringList } from "components/Bartering/BarteringList";

const Bartering = () => {
  return (
    <>
      <Header />
      <section className="router-section header-footer">
        <AddressList />
        <BarteringList />
      </section>
      <Nav />
    </>
  );
};

export default Bartering;
