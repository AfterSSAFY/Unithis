import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

const BarteringDetail = (props: any) => {
  return (
    <>
      <section className="router-section">
        <Header />
        <h1>{props.match.params.id}</h1>
        <Nav />
      </section>
    </>
  );
};

export default BarteringDetail;
