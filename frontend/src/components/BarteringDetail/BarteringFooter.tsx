import React from "react";
import { itemList } from "../../utils/data";
import "./barteringFooter.scss";

export const BarterfingFooter = (props: any) => {
  return (
    <div className="bartering-detail-footer">
      <div className="bartering-detail-footer-container">
        <div className="bartering-need">
          {itemList[props.match.params.id].need}
        </div>
        <button className="btn orange transaction-button">
          채팅으로 거래하기
        </button>
      </div>
    </div>
  );
};
