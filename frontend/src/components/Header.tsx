import React from "react";
import "../style/header.scss";

const title: String = "Unithis";

const Header = () => {
  return (
    <>
      <header>
        <div className="fixed-header-content">
          <div className="fixed-header-title">
            <h1 className="fixed-header-title-text">{title}</h1>
          </div>
          <div className="fixed-header-search-box">
            <input type="text" placeholder="상품 / 지역을 검색해보세요." />
            <img
              className="search-Icon"
              src={require("../assets/icon/search.svg")}
              alt="searchIcon"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
