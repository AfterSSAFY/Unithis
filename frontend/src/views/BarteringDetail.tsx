import React, { useEffect, useState } from "react";
import { barteringList, userInfo } from "../utils/data";
import "../style/BarteringDetail.scss";

const BarteringDetail = (props: any) => {
  const [barteringData, setBarteringData] = useState(Object(null));
  const [userData, setUserData] = useState(Object(null));

  useEffect(() => {
    console.log(barteringList[props.match.params.id]);
    const barteringData = barteringList[props.match.params.id];
    const userData = userInfo[0];

    if (barteringData !== null && userData !== null) {
      setBarteringData(barteringData);
      setUserData(userData);
    }
    console.log("Signup");
  }, []);

  return (
    <>
      <section className="detailSection">
        {/* <h1>{props.match.params.id}</h1> */}
        <div>
          <img src={barteringData.photo} width="100%" />
          <div className="barteringDataDescription">
            <div className="barteringDataProfile">
              <img
                className="barteringDataProfileIcon"
                src={require("../assets/icon/profile.png")}
              />
              <div>
                <div>{userData.nickname}</div>
                <div className="barteringDataAddrea">{userData.address}</div>
              </div>
            </div>
            <hr />
            <div className="barteringDataTitle">{barteringData.name}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BarteringDetail;
