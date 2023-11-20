import React from "react";

import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import "./Head.css";
import {
  faAdjust,
  faCircleNotch,
  faCommentAlt,
  faEllipsisV,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeadMenu() {
  const { toggleSideBar } = useStore(useDataStore);
  const handleMenu = () => {
    toggleSideBar(true);
  };

  return (
    <>
      <div className="head navmenu">
        <div className="menu-icons">
          <FontAwesomeIcon
            className="fa-icon"
            icon={faBars}
            onClick={handleMenu}
          />

          <span>Genie Buddy</span>
        </div>
        <div>
          <FontAwesomeIcon className="fa-icon" icon={faSearch} />
          <FontAwesomeIcon className="fa-icon" icon={faAdjust} />
          <FontAwesomeIcon className="fa-icon" icon={faCircleNotch} />
          <FontAwesomeIcon className="fa-icon" icon={faCommentAlt} />
          <FontAwesomeIcon className="fa-icon faEllipsisV" icon={faEllipsisV} />
        </div>
      </div>
    </>
  );
}

export default HeadMenu;
