import React from "react";
import { HashRouter } from "react-router-dom";
import RouterView from "./components/RouterView";

import "./style/style.scss";
import "./style/pc.scss";

const App = () => {
  return (
    <>
      <div className="pc-content">
        <div className="pc-content-desciption">
          <h1>모바일 환경으로 봐주세요.</h1>
          <h3>- PC 화면은 추후 제작 예정입니다. -</h3>
        </div>
      </div>

      <HashRouter>
        <RouterView />
      </HashRouter>
    </>
  );
};

export default App;
