import React from "react";

import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import "./Head.css";
import "./Header.css";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function HeadMenu() {
  const { toggleSideBar,handleFilterModal,filterModalState } = useStore(useDataStore);


  const handleMenu = () => {
    handleFilterModal(false);
    toggleSideBar(true);
  };

  return (
    <>
      <div className="header">
        <ul className="menu">
          <li className="icon-bar">
            <FontAwesomeIcon
              className="fa-icon-bar"
              icon={faBars}
              onClick={handleMenu}
            />
          </li>
          <li className="logo">
            <div className="logo-text">GenieBuddy</div>
            <div className="logo-img">
              <img
                src={require(`assets/PNG/genie1.png`)}
                alt="avatar"
                className="logo-genie"
              />
            </div>
          </li>
          <li className="icon-search">
            <FontAwesomeIcon className="fa-icon-search" icon={faSearch} />
          </li>
          <li className="icon-bell">
            <img src={require(`assets/PNG/bell.png`)} alt="bell" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeadMenu;
