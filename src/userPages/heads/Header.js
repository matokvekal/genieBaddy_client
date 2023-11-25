import React from "react";

import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import "./Head.css";
import "./Header.css";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeadMenu() {
  const { updateModalsStates, newChatsCounter } = useStore(useDataStore);

  const handleMenu = () => {
    // updateModalsStates("sidebar","open")
  };
  const handleFilter = () => {
    // updateModalsStates("filter","close")
  };

  return (
    <>
      <div className="header" onClick={handleFilter}>
        <ul className="menu">
          <li className="icon-bar">
            <FontAwesomeIcon
              className="fa-icon-bar"
              icon={faBars}
              onClick={() => {
                updateModalsStates("sidebar", "open");
              }}
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
            {newChatsCounter >0 &&<span className="bell-newChatsCounter">{newChatsCounter>0?newChatsCounter:null}</span>}
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeadMenu;
