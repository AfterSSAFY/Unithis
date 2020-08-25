import React from "react";

import Header from "../components/Header";
import Nav from "../components/Nav";

import { AddressList } from "components/Bartering/AddressList";
import { BarteringList } from "components/Bartering/BarteringList";

const Bartering = () => {
  return (
    <>
      <Header />
      <section className="router-container router-header router-footer">
        <AddressList />
        <BarteringList />
      </section>
      <Nav />
    </>
  );
};

export default Bartering;
