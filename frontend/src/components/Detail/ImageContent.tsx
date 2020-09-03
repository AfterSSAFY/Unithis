import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import http, { imageURL } from "api/http-common";
import jwt_decode from "jwt-decode";

export const ImageContent = (props: any) => {
  let history = useHistory();

  const [menu, setMenu] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const nextRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const token: any = sessionStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    const el = document.querySelector(".bartering-detail-container");
    if (el) {
      el.addEventListener("click", (e: any) => {
        if (e.target.nodeName !== "UL" || e.target.nodeName !== "LI") {
          if (imgRef && imgRef.current) {
            imgRef.current.style.opacity = "1";
          }
          if (statusRef && statusRef.current) {
            statusRef.current.style.opacity = "0";
          }
          if (nextRef && nextRef.current) {
            nextRef.current.style.opacity = "1";
          }
        }
      });
    }
  }, []);

  const backwardMovement = () => {
    history.goBack();
  };

  const onSettingHandle = () => {
    setMenu(!menu);
    if (!menu) {
      if (imgRef && imgRef.current) {
        imgRef.current.style.opacity = "0.5";
      }
      if (statusRef && statusRef.current) {
        statusRef.current.style.opacity = "1";
      }
      if (nextRef && nextRef.current) {
        nextRef.current.style.opacity = "0";
      }
    } else {
      if (imgRef && imgRef.current) {
        imgRef.current.style.opacity = "1";
      }
      if (statusRef && statusRef.current) {
        statusRef.current.style.opacity = "0";
      }
      if (nextRef && nextRef.current) {
        nextRef.current.style.opacity = "1";
      }
    }
  };

  const onStatusChange = (e: any) => {
    const el = document.querySelector(".active");
    if (el) {
      el.classList.remove("active");
    }

    http
      .patch("/item/" + e.target.innerText + "/" + props["item"]["id"])
      .catch(e => {
        console.log(e);
      });

    e.target.classList.add("active");
  };

  const onPrevClick = () => {
    setCurrentImage(currentImage - 1);
  };

  const onNextClick = () => {
    setCurrentImage(currentImage + 1);
  };

  return (
    <>
      <div className="image-area">
        <div className="iamge-prev-btn opacity1" onClick={backwardMovement}>
          &#x2190;
        </div>

        {props["item"] && currentImage !== 0 && (
          <div className="prev-btn" onClick={onPrevClick}>
            &#x3c;
          </div>
        )}

        {props["item"] && props["item"]["images"][0] === undefined ? (
          <img
            src={require("assets/unnamed.jpg")}
            alt="barteringImage"
            className="bartering-detail-image opacity1"
          />
        ) : (
          <img
            src={
              props["item"] && imageURL + props["item"]["images"][currentImage]
            }
            ref={imgRef}
            alt="barteringImage"
            className="bartering-detail-image opacity1"
          />
        )}
        {props["item"] && props["item"]["images"].length !== currentImage + 1 && (
          <div className="next-btn" ref={nextRef} onClick={onNextClick}>
            &#x3e;
          </div>
        )}

        {props["item"] &&
          decodedToken &&
          props["item"]["userId"] === decodedToken.id && (
            <>
              <div
                className="iamge-setting-btn opacity1"
                onClick={onSettingHandle}
              >
                &#x22EE;
              </div>
              {
                <div className="status-setting-list opacity0" ref={statusRef}>
                  <ul>
                    {props["item"] && props["item"]["status"] === "대기중" ? (
                      <li className="active">대기중</li>
                    ) : (
                      <li onClick={onStatusChange}>대기중</li>
                    )}

                    {props["item"] && props["item"]["status"] === "거래중" ? (
                      <li className="active">거래중</li>
                    ) : (
                      <li onClick={onStatusChange}>거래중</li>
                    )}

                    {props["item"] && props["item"]["status"] === "거래완료" ? (
                      <li className="active">거래완료</li>
                    ) : (
                      <li onClick={onStatusChange}>거래완료</li>
                    )}
                  </ul>
                </div>
              }
            </>
          )}
      </div>
    </>
  );
};
