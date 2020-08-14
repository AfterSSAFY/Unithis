import React, { useRef } from "react";
import Nav from "../components/Nav";
import "../style/BarteringWrite.scss";

const BarteringWrite = () => {
  const loadFile = (e: any) => {
    if (srcRef && srcRef.current) {
      srcRef.current.src = URL.createObjectURL(e.target.files[0]);
      console.log(srcRef.current.src);
    }
    // console.log(e.target.files[0]);
  };

  const srcRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <section className="router-section footer-only">
        <div className="write-header-wrap">
          <span className="close">X</span>
          <span>글 쓰 기</span>
          <span>완료</span>
        </div>
        <article>
          <img
            src={require("../assets/icon/photo.png")}
            className="photoImage"
            alt="photoImage"
          />

          <input type="file" id="imgInp" onChange={loadFile} />
          <img src="#" alt="img" ref={srcRef} />
        </article>
      </section>
      <Nav />
    </>
  );
};

export default BarteringWrite;
