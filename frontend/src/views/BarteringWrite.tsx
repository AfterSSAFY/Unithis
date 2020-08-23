import React, { useState, ChangeEvent } from "react";
import Nav from "../components/Nav";
import http from "../api/http-common";

const BarteringWrite = () => {
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [need, setNeed] = useState("");
  const [uploadFileList, setUploadFileList] = useState<Array<File>>([]);

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

  const onSubmitHandle = () => {
    let formData = new FormData();
    // formData.append("userId", JSON.stringify(13));
    // formData.append("title", JSON.stringify("책장무료나눔합니다"));
    // formData.append("category", JSON.stringify("가구/인테리어"));
    // formData.append("contents", JSON.stringify("필요하면 가져 가세요"));
    // formData.append("address", JSON.stringify("대전광역시 유성구 궁동"));
    // formData.append("need", JSON.stringify("무료"));
    formData.append("userId", "13");
    formData.append("title", title);
    formData.append("category", category);
    formData.append("contents", contents);
    formData.append("address", "대전 유성구 궁동");
    formData.append("need", contents);

    uploadFileList.forEach(file => {
      formData.append("images", file);
    });

    console.log(
      "title : ",
      title + "\ncatetory : ",
      category,
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
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="router-container router-top router-footer">
        <div className="write-header-wrap">
          <span className="close">X</span>
          <span>글 쓰 기</span>
          <span onClick={onSubmitHandle}>완료</span>
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
                <option value="디지털/가전">디지털/가전</option>
                <option value="가구/인테리어">가구/인테리어</option>
                <option value="유아동/유아도서">유아동/유아도서</option>
                <option value="생활/가공식품">생활/가공식품</option>
                <option value="스포츠/레저">스포츠/레저</option>
                <option value="여성잡화">여성잡화</option>
                <option value="여성의류">여성의류</option>
                <option value="남성패션/잡화">남성패션/잡화</option>
                <option value="게임/취미">게임/취미</option>
                <option value="뷰티/미용">뷰티/미용</option>
                <option value="반려동물용품">반려동물용품</option>
                <option value="도서/티켓/음반">도서/티켓/음반</option>
                <option value="기타물품">기타물품</option>
              </select>
            </div>

            <div>
              <label className="need">교환 받을 물건 / 필요한 물건</label>
              <input
                className="need"
                type="text"
                placeholder="교환 받을 물건 / 필요한 물건"
                value={need}
                onChange={onChangeHandle}
                required
              />
            </div>

            <div>
              <label>상품 설명</label>
              <textarea
                placeholder="상품에 대한 설명을 작성해주세요."
                className="contents"
                value={contents}
                onChange={onChangeHandle}
              ></textarea>
            </div>
          </div>
        </article>
      </section>
      <Nav />
    </>
  );
};

export default BarteringWrite;
