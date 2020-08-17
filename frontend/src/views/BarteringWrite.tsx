import React, { useState } from "react";
import Nav from "../components/Nav";
import "../style/BarteringWrite.scss";
import http from "../api/http-common";

const BarteringWrite = () => {
  // const imgRef = useRef<HTMLImageElement>(null);

  const [imgSrc, setImgSrc] = useState<Array<string>>([]);
  const [imgResouse, setImgResouse] = useState<Array<File>>([]);

  const loadFile = (e: any) => {
    const files = e.target.files;
    let arr: Array<string> = [...imgSrc];
    let arr2: Array<File> = [...imgResouse];

    if (arr.length !== 5) {
      Array.from(files).map((v: any) => {
        if (arr.length < 5) {
          arr.push(URL.createObjectURL(v));
          arr2.push(v);
        }
      });
    }
    setImgSrc(arr);
    setImgResouse(arr2);

    // if (srcRef && srcRef.current) {
    //   console.log(imgSrc);
    //   srcRef.current.src = URL.createObjectURL(e.target.files[0]);
    //   // console.log(srcRef.current.src);
    // }
  };

  console.log(imgResouse);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.type === "email") {
  //     setEmail(e.target.value);
  //   } else {
  //     setPassword(e.target.value);
  //   }
  // };

  const onSubmitHandle = () => {
    console.log("ss");
    // let form = new FormData();
    // form.append("userId", "13");
    // form.append("title", "test");
    // form.append("contents", "디지털/가전");
    // form.append("need", "계란 1개");
    // form.append("images", imgResouse[0]);

    http
      .post("/item", {
        userId: 13,
        title: "test",
        contents: "contents",
        category: "디지털/가전",
        need: "계란 1개",
        images: imgResouse
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <section className="router-section footer-only">
        <div className="write-header-wrap">
          <span className="close">X</span>
          <span>글 쓰 기</span>
          <span onClick={onSubmitHandle}>완료</span>
        </div>
        <article>
          <div className="write-body-wrap">
            <label>
              <figure>
                <img
                  src={require("../assets/icon/photo.png")}
                  className="photoImage"
                  alt="photoImage"
                />
                <figcaption>5/{imgSrc.length}</figcaption>
              </figure>
              <input
                type="file"
                onChange={loadFile}
                accept=".gif, .jpg, .png, .jpeg"
                multiple
              />
            </label>
            <div className="bartering-image-content">
              {imgSrc &&
                imgSrc.map((v, i) => {
                  return (
                    <img
                      key={v}
                      className="PhotoResult"
                      src={v}
                      alt="img"
                      // ref={el => (el === null ? el : (imgRef.current[i] = el))}
                    />
                  );
                })}
            </div>
          </div>
          <div className="write-body-wrap-column">
            <div>
              <label className="title">글 제목</label>
              <input
                className="title"
                type="text"
                placeholder="글 제목"
                // onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="category">카테고리</label>
              <select name="job">
                <option value="">카테고리 선택</option>
                <option value="디지털 / 가전">디지털 / 가전</option>
                <option value="생활 / 가공식품">생활 / 가공식품</option>
                <option value="가구 / 인테리어">가구 / 인테리어</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="title">필욜한 것</label>
              <input
                className="need"
                type="text"
                placeholder="필요한 것"
                required
              />
            </div>

            <div>
              <label>제품 설명</label>
              <input
                className="contents"
                type="text"
                placeholder="가격"
                required
              />
            </div>
          </div>
        </article>
      </section>
      <Nav />
    </>
  );
};

export default BarteringWrite;
