import React, { useState } from "react";
import "style/header.scss";

export const Header = () => {
  const [settingMenu, setSettingMenu] = useState<boolean>(false);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const onSearchHandle = () => {
    setSearchMenu(!searchMenu);
    const el = document.querySelector(".search-container");
    if (!searchMenu) {
      if (el) {
        el.classList.remove("none");
        el.classList.add("inline");
      }
    } else {
      if (el) {
        el.classList.add("none");
        el.classList.remove("inline");
      }
    }
  };

  const onSettingHandle = () => {
    setSettingMenu(!settingMenu);
    const el = document.querySelector(".address-list-content");
    const el2 = document.querySelector(".category-content");
    if (!settingMenu) {
      if (el) {
        el.classList.remove("none");
        el.classList.add("inline");
      }
      if (el2) {
        el2.classList.remove("none");
        el2.classList.add("inline");
      }
    } else {
      if (el) {
        el.classList.add("none");
        el.classList.remove("inline");
      }
      if (el2) {
        el2.classList.remove("inline");
        el2.classList.add("none");
      }
    }
  };

  return (
    <>
      <header>
        <div className="fixed-header-content">
          <div className="fixed-header-title">
            <h1 className="fixed-header-title-text">Unithis</h1>
          </div>
          <div className="fixed-header-search-box">
            <img
              className="search-Icon"
              src={require("assets/icon/search.svg")}
              alt="searchIcon"
              onClick={onSearchHandle}
            />
            <img
              className="category-setting-btn"
              src={require("assets/icon/setting.png")}
              alt="settingIcon"
              onClick={onSettingHandle}
            />
          </div>
        </div>
      </header>
    </>
  );
};
