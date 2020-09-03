import React, { useState, useEffect } from "react";
import http from "api/http-common";
import jwt_decode from "jwt-decode";

import { Header } from "components/Write&Update/Header";
import { useHistory } from "react-router-dom";
import { PhotoSelecter } from "components/Write&Update/PhotoSelecter";
import { ImagePreview } from "components/Write&Update/IamgePreview";
import { UpdateContent } from "components/Write&Update/Content";
import { Nav } from "components/Nav";

import "components/Write&Update/body.scss";

const BarteringWrite = () => {
  let history = useHistory();
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [need, setNeed] = useState("");
  const [uploadFileList, setUploadFileList] = useState<Array<File>>([]);

  useEffect(() => {
    sessionStorage.setItem("nowPath", "/BarteringWrite");
  }, []);

  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    const token: any = sessionStorage.getItem("token");
    let decodedToken: any;

    if (token) {
      decodedToken = jwt_decode(token);
    }

    let formData = new FormData();
    formData.append("userId", decodedToken.id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("contents", contents);
    formData.append("address", decodedToken.address);
    formData.append("need", need);

    uploadFileList.forEach(file => {
      formData.append("images", file);
    });

    getWriteItemAPI(formData);
  };

  const getWriteItemAPI = (formData: FormData) => {
    http
      .post("/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
          Accept: "application/json"
        }
      })
      .then(() => {
        alert("등록완료!");
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
          <Header title={"상 품 등 록"} />
          <article className="article-area">
            <div className="write-body-wrap">
              <PhotoSelecter
                onPhotoSelecter={onPhotoSelecter}
                onFileSelecter={onFileSelecter}
                item={imagePreviewList}
              />
              <ImagePreview previewList={imagePreviewList} />
            </div>
            <UpdateContent state={state} item={item} />
          </article>
        </form>
      </section>
      <Nav />
    </>
  );
};

export default BarteringWrite;
