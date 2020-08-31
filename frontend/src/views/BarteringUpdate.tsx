import React, { useState, ChangeEvent, useEffect } from "react";
import Nav from "../components/Nav";
import http, { imageURL } from "../api/http-common";
import { useHistory } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../style/barteringwrite.scss";

const BarteringUpdate = (props: any) => {
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);
  const [itemId, setItemId] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState<Array<string>>([]);
  const [contents, setContents] = useState("");
  const [need, setNeed] = useState("");
  const [uploadFileList, setUploadFileList] = useState<Array<File>>([]);
  let history = useHistory();
  const token: any = localStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    if (props) {
      localStorage.setItem(
        "nowPath",
        "/BarteringUpdate/" + props.match.path.split("/")[2]
      );

      // console.log(props.match.path.split("/")[2]);
      http
        .get("/category")
        .then(({ data }) => {
          setCategoryList(data);
        })
        .catch(error => {
          console.log(error);
        });

      http
        .get("/item/" + props.match.path.split("/")[2])
        .then(({ data }) => {
          setItemId(data.id);
          setTitle(data.title);
          setCategory(data.category);
          setNeed(data.need);
          const images = data.images.map((v: any) => {
            return imageURL + v;
          });
          setImagePreviewList(images);
          setContents(data.contents);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [props]);

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

  const close = () => {
    history.push("/Home");
  };

  const onSubmitHandle = (e: any) => {
    e.preventDefault();

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

    console.log(
      "id :",
      itemId,
      "\nuserID : ",
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
      "\nimages : ",
      uploadFileList
    );

    http
      .patch("/item/" + itemId, formData, {
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
          Accept: "application/json"
        }
      })
      .then(({ data }) => {
        alert("수정완료!");
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onDeleteImage = (name: string) => {
    console.log(name);
    http
      .delete("/item/image/" + name)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <section className="router-container-fixed router-top router-footer">
        <form onSubmit={onSubmitHandle}>
          <div className="write-header-wrap">
            <span className="close" onClick={close}>
              X
            </span>
            <span>상 품 수 정</span>
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
                      <div className="photo-area" key={v}>
                        <img
                          key={v}
                          className="PhotoResult"
                          src={v}
                          alt="img"
                          // ref={el => (el === null ? el : (imgRef.current[i] = el))}
                        />
                        <img
                          className="user-profile-delete"
                          src={require("../assets/icon/delete.png")}
                          alt="delete"
                          onClick={() => onDeleteImage(v)}
                        />
                      </div>
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

export default BarteringUpdate;
