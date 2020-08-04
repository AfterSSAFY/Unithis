import React from "react";
import { HashRouter } from "react-router-dom";

import Header from "./components/Header";
import RouterView from "./components/RouterView";
import Nav from "./components/Nav";

import "./style/style.scss";

const App = () => {
  return (
    <>
      <Header />
      <HashRouter>
        <RouterView />
        <Nav />
      </HashRouter>
    </>
  );
};

export default App;
