import React, { useEffect, useState, ChangeEvent } from "react";
import http from "api/http-common";

export const UpdateContent = (props: any) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [need, setNeed] = useState("");
  const [categoryList, setCategoryList] = useState<Array<string>>([]);

  useEffect(() => {
    http
      .get("/category")
      .then(({ data }) => {
        setCategoryList(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (props) {
      setTitle(props["item"]["title"]);
      setCategory(props["item"]["category"]);
      setContents(props["item"]["contents"]);
      setNeed(props["item"]["need"]);
    }
  }, [props]);

  const onChangeHandle = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.className === "title") {
      props["state"].onTitle(e.target.value);
    } else if (e.target.className === "categorySelect") {
      props["state"].onCategory(e.target.value);
    } else if (e.target.className === "contents") {
      props["state"].onContents(e.target.value);
    } else if (e.target.className === "need") {
      props["state"].onNeed(e.target.value);
    } else {
      return;
    }
  };

  return (
    <>
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
    </>
  );
};
