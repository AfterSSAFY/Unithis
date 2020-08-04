import React, { useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import "../style/nav.scss";

const Nav = () => {
  // const navigationClickEvent = (e: React.MouseEvent<HTMLElement>): void => {
  //   console.log(e.target.innerHTML);
  // };

  const navRef = useRef<any>([]);
  // const navigationClickEvent = (e: any): void => {
  //   // console.log(e.target.innerHTML);
  //   navRef.current.forEach((el: any) => {
  //     if (el.classList[1] !== undefined) {
  //       el.classList.remove("active");
  //     }
  //     console.log(el.classList[1]);
  //   });
  //   // console.log(navRef.current);
  //   e.target.style.color = "#ff9697";
  // };

  return (
    <>
      <nav>
        <ul className="nav__navigation">
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              activeClassName="active"
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav__naviagtion--nav-text"
              activeClassName="active"
              to="/test"
            >
              Test
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
