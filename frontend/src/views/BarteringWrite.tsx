import React, { useState, ChangeEvent, useEffect } from "react";
import Nav from "../components/Nav";
import http from "../api/http-common";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "../style/barteringwrite.scss";

const BarteringWrite = () => {
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState<Array<string>>([]);
  const [contents, setContents] = useState("");
  const [need, setNeed] = useState("");
  const [uploadFileList, setUploadFileList] = useState<Array<File>>([]);
  let history = useHistory();

  const loadFile = (e: any) => {
    const files = e.target.files;
    let image: Array<string> = [...imagePreviewList];
    let file: Array<File> = [...uploadFileList];

    if (image.length !== 5) {
      Array.from(files).forEach((v: any) => {
        if (image.length < 5) {
          image.push(URL.createObjectURL(v));
          file.push(v);
        }
      });
    }
    setImagePreviewList(image);
    setUploadFileList(file);
  };

  const onChangeHandle = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.className === "title") {
      setTitle(e.target.value);
    } else if (e.target.className === "categorySelect") {
      setCategory(e.target.value);
    } else if (e.target.className === "contents") {
      setContents(e.target.value);
    } else if (e.target.className === "need") {
      setNeed(e.target.value);
    } else {
      return;
    }
  };

  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");
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

    // console.log(uploadFileList);

    uploadFileList.forEach(file => {
      formData.append("images", file);
    });

    console.log(
      "userID : ",
      String(decodedToken.id),
      "\ntitle : ",
      title + "\ncatetory : ",
      category,
      "\naddress : ",
      decodedToken.address,
      "\nneed : ",
      need,
      "\ncontents : ",
      contents,
      "\nfile : ",
      uploadFileList
    );

    http
      .post("/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
          Accept: "application/json"
        }
      })
      .then(({ data }) => {
        alert("등록완료!");
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    localStorage.setItem("nowPath", "/BarteringWrite");

    http
      .get("/category")
      .then(({ data }) => {
        setCategoryList(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const close = () => {
    history.push("/Home");
  };

  return (
    <>
      <section className="router-container-fixed router-top router-footer">
        <form onSubmit={onSubmitHandle}>
          <div className="write-header-wrap">
            <span className="close" onClick={close}>
              X
            </span>
            <span>상 품 등 록</span>
            <input type="submit" value="완료" />
          </div>
          <article className="article-area">
            <div className="write-body-wrap">
              <label>
                <figure>
                  <img
                    src={require("../assets/icon/photo.png")}
                    className="photoImage"
                    alt="photoImage"
                  />
                  <figcaption>{imagePreviewList.length}/5</figcaption>
                </figure>
                <input
                  type="file"
                  onChange={loadFile}
                  accept=".gif, .jpg, .png, .jpeg"
                  multiple
                />
              </label>
              <div className="bartering-image-content">
                {imagePreviewList &&
                  imagePreviewList.map((v, i) => {
                    return (
                      <>
                        <img
                          key={v}
                          className="PhotoResult"
                          src={v}
                          alt="img"
                          // ref={el => (el === null ? el : (imgRef.current[i] = el))}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="write-body-wrap-column">
              <div>
                <label className="title">상품 이름</label>
                <input
                  className="title"
                  type="text"
                  placeholder="상품 이름"
                  value={title}
                  onChange={onChangeHandle}
                  required
                />
              </div>

              <div>
                <label className="category">카테고리</label>
                <select
                  className="categorySelect"
                  value={category}
                  onChange={onChangeHandle}
                >
                  <option value="">카테고리 선택</option>

                  {categoryList.map(v => {
                    return (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="need">교환 받을 물건 / 필요한 물건</label>
                <input
                  className="need"
                  type="text"
                  placeholder="교환 받을 물건 / 필요한 물건"
                  value={need}
                  required
                  onChange={onChangeHandle}
                />
              </div>

              <div>
                <label>상품 설명</label>
                <textarea
                  placeholder="상품에 대한 설명을 작성해주세요."
                  className="contents"
                  value={contents}
                  required
                  onChange={onChangeHandle}
                ></textarea>
              </div>
            </div>
          </article>
        </form>
      </section>
      <Nav />
    </>
  );
};

export default BarteringWrite;
