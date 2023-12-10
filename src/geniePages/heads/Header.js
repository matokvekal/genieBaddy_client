import React from "react";

import { useStore } from "zustand";
import useDataStore from "stores/appStore";

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
      <div className="genie-header" onClick={handleFilter}>
        <ul className="genie-menu">
          <li className="genie-icon-bar"       onClick={handleMenu}>
                <img
                src={require(`assets/PNG/bar.png`)}
                alt="avatar"
                className="genie-bar"
              />
          </li>
          <li className="genie-logo">
            <div className="genie-logo-text">GenieBuddy</div>
            <div className="genie-logo-img">
              <img
                src={require(`assets/PNG/genie1.png`)}
                alt="avatar"
                className="genie-logo-genie"
              />
            </div>
          </li>
          <li className="genie-icon-search">
          <img src={require(`assets/PNG/search.png`)} alt="search" />
          </li>
          <li className="genie-icon-bell">
            <img src={require(`assets/PNG/bell.png`)} alt="bell" />
            {newChatsCounter >0 &&<span className="genie-bell-newChatsCounter">{newChatsCounter>0?newChatsCounter:null}</span>}
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeadMenu;
