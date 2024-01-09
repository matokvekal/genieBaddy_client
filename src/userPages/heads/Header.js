import React from "react";

import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import "./Head.css";
import "./Header.css";

function HeadMenu() {
  const { updateModalsStates, newChatsCounter } = useStore(useDataStore);

  const handleMenu = () => {
    updateModalsStates("sidebar", "open");
    // updateModalsStates("sidebar","open")
  };
  const handleFilter = () => {
    // updateModalsStates("filter","close")
  };

  return (
    <>
      <div className="header" onClick={handleFilter}>
        <ul className="menu">
          <li className="icon-bar"       onClick={handleMenu}>
            <img
              src={require(`assets/PNG/bar.png`)}
              alt="avatar"
              className="user-bar"
            />
          </li>
          <li className="logo">
            <div className="logo-text">Share</div>
            <div className="logo-img">
              <img
                src={require(`assets/PNG/genie1.png`)}
                alt="avatar"
                className="logo-genie"
              />
            </div>
          </li>
          <li className="icon-search">
            <img
              src={require(`assets/PNG/search.png`)}
              alt="avatar"
              className="genie-search"
            />
          </li>
          <li className="icon-bell">
            <img src={require(`assets/PNG/bell.png`)} alt="bell" />
            {newChatsCounter > 0 && (
              <span className="bell-newChatsCounter">
                {newChatsCounter > 0 ? newChatsCounter : null}
              </span>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeadMenu;
