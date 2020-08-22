import React from "react";

import "../style/BarteringDetail.scss";
import { BarteringBody } from "components/BarteringDetail/BarteringBody";
import { BarterfingFooter } from "components/BarteringDetail/BarteringFooter";

const BarteringDetail = (props: any) => {
  return (
    <section className="detailSection">
      <BarteringBody {...props} />
      <BarterfingFooter {...props} />
    </section>
  );
};

export default BarteringDetail;
