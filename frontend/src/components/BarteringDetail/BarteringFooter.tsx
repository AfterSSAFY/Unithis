import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import http from "../../api/http-common";

import "./barteringFooter.scss";

export const BarteringFooter = (props: any) => {
  let history = useHistory();
  const [user1Id, setUser1Id] = useState<string>();
  const [user2Id, setUser2Id] = useState<string>();

  useEffect(() => {
    if (props["item"]["decodedToken"] && props["item"]["item"]) {
      localStorage.setItem(
        "nowPath",
        "/BarteringDetail/" + props.match.path.split("/")[2]
      );

      setUser1Id(props["item"]["item"]["userId"]);
      setUser2Id(props["item"]["decodedToken"]["id"]);
    }
  }, [props]);

  const onChatingHandle = () => {
    if (props["item"]["decodedToken"]) {
      if (user1Id === user2Id) {
        return;
      }

      http
        .post("/chat/room", {
          user1Id: props["item"]["item"]["userId"],
          user2Id: props["item"]["decodedToken"]["id"]
        })
        .then(({ data }) => {
          history.push({
            pathname: "/Chat/" + data,
            state: {
              user1Id: props["item"]["item"]["userId"],
              user2Id: props["item"]["decodedToken"]["id"]
            }
          });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      history.push("/Signin");
    }
  };

  const onUpdateBartering = () => {
    // dispatch(setPath("/BarteringUpdate/" + props["item"]["item"]["id"]));
    if (props["item"]) {
      history.push("/BarteringUpdate/" + props["item"]["item"]["id"]);
    } else {
      history.push("/Loading");
    }
  };

  const onDeleteBartering = () => {
    const userSelection = window.confirm("정말 삭제하시겠습니끼?");
    if (userSelection) {
      http
        .delete("/item/" + props["item"]["item"]["id"])
        .then(({ data }) => {
          alert("삭제완료");
          history.push("/Home");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div className="bartering-detail-footer">
      <div className="bartering-detail-footer-container">
        <div className="bartering-need">
          {props["item"]["item"] && props["item"]["item"]["need"]}
        </div>
        {user1Id && user2Id && user1Id !== user2Id ? (
          <button
            className="btn orange transaction-button rounded"
            onClick={onChatingHandle}
          >
            채팅으로 거래하기
          </button>
        ) : (
          <>
            <button
              className="btn rounded red transaction-button"
              onClick={onDeleteBartering}
            >
              상품 삭제
            </button>

            <button
              className="btn rounded blue transaction-button"
              onClick={onUpdateBartering}
            >
              상품 정보 수정
            </button>
          </>
        )}
      </div>
    </div>
  );
};
