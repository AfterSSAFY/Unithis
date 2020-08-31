import React, { useEffect, useState } from "react";

import { BarteringWrapper } from "components/BarteringDetail/BarteringWrapper";
import { BarteringFooter } from "components/BarteringDetail/BarteringFooter";
import { Bartering_List } from "react-app-env";

import jwt_decode from "jwt-decode";
import http from "../api/http-common";

const BarteringDetail = (props: any) => {
  const [item, setItem] = useState<Bartering_List>();
  const token: any = localStorage.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    if (props) {
      localStorage.setItem(
        "nowPath",
        "/BarteringDetail/" + props.match.params.id
      );

      http
        .get("/item/" + props.match.params.id)
        .then(({ data }) => {
          setItem(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

  const barteringItem = token ? { item, decodedToken } : { item };

  return (
    <section className="bartering-detail-container">
      <BarteringWrapper item={item} {...props} />
      <BarteringFooter item={barteringItem} {...props} />
    </section>
  );
};

export default BarteringDetail;
