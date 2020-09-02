import React, { useEffect, useState } from "react";
import http, { imageURL } from "api/http-common";

export const ImagePreview = (props: any) => {
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);

  useEffect(() => {
    if (props) {
      setImagePreviewList(props["previewList"]);
    }
  }, [props]);

  const onDeleteImage = (name: string, i: number) => {
    const namesplit = name.split("/");
    if (namesplit.length !== 1) {
      let arr = [...imagePreviewList];
      arr.splice(i, 1);
      setImagePreviewList(arr);
      return;
    }
    http
      .delete("/item/image/" + namesplit[namesplit.length - 1])
      .then(() => {
        alert("삭제완료");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="bartering-image-content">
        {imagePreviewList &&
          imagePreviewList.map((v, i) => {
            return (
              <div className="photo-area" key={v}>
                {v.split("blob:").length !== 1 ? (
                  <img key={v} className="PhotoResult" src={v} alt="img" />
                ) : (
                  <img
                    key={v}
                    className="PhotoResult"
                    src={imageURL + v}
                    alt="img"
                  />
                )}
                <img
                  className="user-profile-delete"
                  src={require("assets/icon/delete.png")}
                  alt="delete"
                  onClick={() => onDeleteImage(v, i)}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};
