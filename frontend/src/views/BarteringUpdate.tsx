import React, { useState, useEffect } from "react";
import http from "api/http-common";
import jwt_decode from "jwt-decode";

import { Header } from "components/Write&Update/Header";
import { useHistory } from "react-router-dom";
import { PhotoSelecter } from "components/Write&Update/PhotoSelecter";
import { ImagePreview } from "components/Write&Update/IamgePreview";
import { Content } from "components/Write&Update/Content";
import { Nav } from "components/Nav";

import "components/Write&Update/body.scss";

const BarteringUpdate = (props: any) => {
  let history = useHistory();

  const [itemId, setItemId] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [need, setNeed] = useState("");
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);
  const [uploadFileList, setUploadFileList] = useState<Array<File>>([]);

  useEffect(() => {
    if (props) {
      sessionStorage.setItem(
        "nowPath",
        "/BarteringUpdate/" + props.location.pathname.split("/")[2]
      );

      getItemAPI(props.location.pathname.split("/")[2]);
    }
  }, [props]);

  const getItemAPI = (id: number) => {
    http
      .get("/item/" + id)
      .then(({ data }) => {
        setItemId(data.id);
        setTitle(data.title);
        setCategory(data.category);
        setNeed(data.need);
        setImagePreviewList(data.images);
        setContents(data.contents);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    let decodedToken: any;
    const token: any = sessionStorage.getItem("token");

    if (token) {
      decodedToken = jwt_decode(token);
    }

    let formData = new FormData();
    formData.append("id", String(itemId));
    formData.append("userId", decodedToken.id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("contents", contents);
    formData.append("address", decodedToken.address);
    formData.append("need", need);

    uploadFileList.forEach(file => {
      formData.append("images", file);
    });

    getUpdateItemAPI(formData);
  };

  const getUpdateItemAPI = (formData: FormData) => {
    http
      .patch("/item/" + itemId, formData, {
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
          Accept: "application/json"
        }
      })
      .then(() => {
        alert("수정완료!");
        history.push("/Home");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onPhotoSelecter = (photoSelecter: any) => {
    setImagePreviewList(photoSelecter);
  };

  const onFileSelecter = (fileSelecter: any) => {
    setUploadFileList(fileSelecter);
  };

  const onTitle = (title: string) => {
    setTitle(title);
  };

  const onCategory = (category: string) => {
    setCategory(category);
  };

  const onContents = (contents: string) => {
    setContents(contents);
  };

  const onNeed = (need: string) => {
    setNeed(need);
  };

  const state = { onTitle, onCategory, onContents, onNeed };
  const item = { title, category, contents, need };

  return (
    <>
      <section className="router-container-fixed router-top router-footer">
        <form onSubmit={onSubmitHandle}>
          <Header title={"상 품 수 정"} />
          <article className="article-area">
            <div className="write-body-wrap">
              <PhotoSelecter
                onPhotoSelecter={onPhotoSelecter}
                onFileSelecter={onFileSelecter}
                item={imagePreviewList}
              />
              <ImagePreview previewList={imagePreviewList} />
            </div>
            <Content state={state} item={item} />
          </article>
        </form>
      </section>
      <Nav />
    </>
  );
};

export default BarteringUpdate;
