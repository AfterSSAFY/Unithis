import React from "react";
import { NavLink } from "react-router-dom";
import "../style/nav.scss";

const Nav = () => {
  return (
    <>
      <nav className="mobile sign">
        <ul className="nav__navigation">
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              to="/Home"
              activeClassName="active"
              replace
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__naviagtion--nav-text" to="/test" replace>
              Test
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              to="/BarteringWrite"
              activeClassName="active"
              replace
            >
              글쓰기
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              to="/signin"
              activeClassName="active"
              replace
            >
              My
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
