import React from "react";
// import { barteringList } from "../utils/data";

const BarteringDetail = (props: any) => {
  return (
    <>
      <section className="Detail-section">
        <h1>{props.match.params.id}</h1>
      </section>
    </>
  );
};

export default BarteringDetail;
