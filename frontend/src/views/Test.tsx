import React, { useEffect } from "react";
import http from "../api/http-common";
import "../style/test.scss";

const Test = () => {
  const color = [
    { bg: "#f2f2f2" },
    { lightgray: "#e2e2e2" },
    { ashgrey: "#bec3c7" },
    { ashgreyhover: "#d0d5d9" },
    { gray: "#8b8b8b" },
    { greyhover: "#747373" },
    { boldgrey: "#4c4c4c" },
    { darkblue: "#34495e" },
    { darkbluehover: "#425c77" },
    { blue: "#3cbce1" },
    { bluehover: "#56d7ed" },
    { green: "#10bc98" },
    { greenhover: "#13d7ae" },
    { lightgreen: "#87bc58" },
    { lightgreenhover: "#c0da82" },
    { orange: "#e77e22" },
    { orangehover: "#f6b417" },
    { yellow: "#fac75a" },
    { yellowhover: "#fce17a" },
    { red: "#e84c3d" },
    { redhover: "#f57b8a" },
    { pink: "#ff9697" },
    { purple: "#9a59b5" },
    { purplehover: "#c472e6" }
  ];

  const get = () => {
    http
      .get("/users/")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const post = () => {
    http
      .post("/posts", { title: "foo", body: "bar", userId: 1 })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("component did mount with useEffect!");
  }, []);

  return (
    <>
      <div className="test-content">
        <div>
          <h2 className="test-title">API 테스트</h2>
          <div className="test-description">
            <ul>
              <li>
                <button onClick={get}>get</button>
              </li>
              <li>
                <button onClick={post}>post</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="test-content">
        <div>
          <h2 className="test-title">Font</h2>
          <div className="test-description">
            <ul>
              <li className="검은고딕">검은고딕 ABCD</li>
              <li className="에스코어드림">에스코어드림 ABCD</li>
              <li className="잘난체">잘난체 ABCD</li>
              <li className="주아체">주아체 ABCD</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="test-content">
        <div>
          <h2 className="test-title">Color</h2>
          <div className="test-description">
            <ul>
              {color.map((color, i) => {
                const pick = {
                  backgroundColor: Object.values(color)[0]
                };
                return (
                  <li
                    className={Object.values(color) + " color"}
                    key={i}
                    style={pick}
                  >
                    {Object.keys(color)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="test-content">
        <div>
          <h2 className="test-title">Color</h2>
          <div className="test-description">
            <ul>
              {color.map((color, i) => {
                const pick = {
                  backgroundColor: Object.values(color)[0]
                };
                return (
                  <li
                    className={Object.values(color) + " color"}
                    key={i}
                    style={pick}
                  >
                    {Object.keys(color)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
