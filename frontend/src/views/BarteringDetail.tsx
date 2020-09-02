import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import http from "api/http-common";

import { Bartering_List } from "react-app-env";
import { ImageContent } from "components/Detail/ImageContent";
import { ProfileContent } from "components/Detail/ProfileContent";
import { DetailContent } from "components/Detail/DetailContet";
import { Footer } from "components/Detail/Footer";

import "components/Detail/body.scss";

const BarteringDetail = (props: any) => {
  const [item, setItem] = useState<Bartering_List>();

  useEffect(() => {
    if (props) {
      localStorage.setItem(
        "nowPath",
        "/BarteringDetail/" + props.location.pathname.split("/")[2]
      );

      http
        .get("/item/" + props.location.pathname.split("/")[2])
        .then(({ data }) => {
          setItem(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

  let decodedToken;
  const token: any = localStorage.getItem("token");
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const barteringItem = token ? { item, decodedToken } : { item };

  return (
    <section className="bartering-detail-container">
      <div className="bartering-detail-wrapper">
        <ImageContent item={item} {...props} />
        <div className="bartering-detail-description-area">
          <ProfileContent item={item} {...props} />
          <DetailContent item={item} {...props} />
        </div>
        <Footer item={barteringItem} {...props} />
      </div>
    </section>
  );
};

export default BarteringDetail;
