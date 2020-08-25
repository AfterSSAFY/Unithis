import React from "react";

import { BarteringWrapper } from "components/BarteringDetail/BarteringWrapper";
import { BarterfingFooter } from "components/BarteringDetail/BarteringFooter";

const BarteringDetail = (props: any) => {
  return (
    <section className="bartering-detail-container">
      <BarteringWrapper {...props} />
      <BarterfingFooter {...props} />
    </section>
  );
};

export default BarteringDetail;
