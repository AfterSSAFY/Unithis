import React, { useEffect } from "react";
import { barteringList, userList, photoList } from "../utils/data";
import { address } from "../assets/data";
import "../style/BarteringDetail.scss";

const BarteringDetail = (props: any) => {
  useEffect(() => {
    console.log("Signup");
    console.log(address);
  }, []);

  return (
    <>
      <section className="detailSection">
        <div className="barteringBody">
          <div className="image-wrap">
            <div className="iamge-prev-btn">&#x2190;</div>
            <img src={photoList[props.match.params.id].image} />
          </div>
          <div className="barteringDataDescription">
            <div className="barteringDataProfile">
              <img
                className="barteringDataProfileIcon"
                src={require("../assets/icon/profile.png")}
              />
              <div>
                <div>{userList[props.match.params.id].nickname}</div>
                <div className="barteringDataAddrea">{userList[0].address}</div>
              </div>
            </div>
            <hr />
            <div className="barteringDataHeader">
              <div className="barteringTitle">
                {barteringList[props.match.params.id].title}
              </div>
              <div className="barteringCategory">
                {barteringList[props.match.params.id].category}
              </div>
              <div className="barteringDate">
                {barteringList[props.match.params.id].date}
              </div>
              <div className="barteringContent">
                {barteringList[props.match.params.id].contents}
              </div>
            </div>
          </div>
        </div>

        <div className="barteringFooter">
          <div className="barteringFooterContainer">
            <div className="barteringNeed">
              {barteringList[props.match.params.id].need}
            </div>
            <button className="btn orange transactionButton">
              채팅으로 거래하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BarteringDetail;
