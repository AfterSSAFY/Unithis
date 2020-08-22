import React from "react";
import { itemList } from "../../utils/data";

export const BarterfingFooter = (props: any) => {
  return (
    <div className="barteringFooter">
      <div className="barteringFooterContainer">
        <div className="barteringNeed">
          {itemList[props.match.params.id].need}
        </div>
        <button className="btn orange transactionButton">
          채팅으로 거래하기
        </button>
      </div>
    </div>
  );
};
