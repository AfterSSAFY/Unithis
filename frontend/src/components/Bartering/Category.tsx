import React, { useState, useEffect } from "react";
import http from "api/http-common";

import "./category.scss";

export const Category = (props: any) => {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState<Array<string>>([]);

  const onChangeHandle = (e: any) => {
    if (e.target) {
      setCategory(e.target.value);
    }
  };

  useEffect(() => {
    if (category) {
      props.onCategory(category);
    }
  }, [category]);

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

  return (
    <div className="category-content none">
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
  );
};
