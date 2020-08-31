import React, { useEffect, useState } from "react";
import http from "../../api/http-common";
import jwt_decode from "jwt-decode";

import "./search.scss";
import { SearchList } from "react-app-env";

export const SearchForm = () => {
  const token: any = localStorage.getItem("token");
  let decodedToken: any;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  const [resentSearchList, setResentSearchList] = useState<Array<SearchList>>(
    []
  );

  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    if (decodedToken && decodedToken.id) {
      http
        .get("/search/" + decodedToken.id)
        .then(({ data }) => {
          setResentSearchList(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    return () => {
      setReRender(false);
    };
  }, [reRender]);

  let timer: any;
  const keyHandler = (e: any) => {
    const input = e.target.value;
    if (input === "") {
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (decodedToken.id) {
        http
          .post("/search", {
            keyword: input,
            userId: decodedToken.id
          })
          .then(({ data }) => {
            setResentSearchList(data);
            setReRender(!reRender);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }, 1000);
  };

  const deleteRecentSeach = (id: number) => {
    const userSelection = window.confirm("정말 삭제하시겠습니까?");
    if (userSelection) {
      http
        .delete("/search/" + id)
        .then(({ data }) => {
          setReRender(!reRender);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <article className="search-container none">
        <input
          className="search-input"
          type="text"
          placeholder="어떤 상품을 찾고 계신가요?"
          onChange={keyHandler}
        />
        <div className="recent-search-container">
          <div className="recent-search-title">최근 검색</div>
          <div>
            {resentSearchList.length !== 0 ? (
              resentSearchList.map(v => {
                return (
                  <div key={v.id} className="recent-search-area">
                    <div className="recent-search-text">{v.keyword}</div>
                    <div
                      className="recent-search-delete-btn"
                      onClick={() => deleteRecentSeach(v.id)}
                    >
                      x
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="recent-search-area">
                최근 검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
};
