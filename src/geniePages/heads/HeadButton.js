import React from "react";
import { POST_STATUS } from "constants/jeneral";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const HeadButton = ({ active, name, postsCount, setConvFilter }) => {
  const { toggleSideBar } = useStore(useDataStore);
  const { genieNewPostsCounter } =  useStore(useDataStore);
  const handelClick = (e) => {
    e.stopPropagation();
    toggleSideBar(false);
    setConvFilter(name);
  };
  return (
    <div
      className={`chat-button ${active ? "active" : ""}`}
      onClick={handelClick}
    >
      <div className="chat-button-name">{name}</div>
      <div className={`chat-button-posts ${active ? "active" : ""}`}>
        {name === POST_STATUS.NEW ? genieNewPostsCounter : postsCount}
      </div>
    </div>
  );
};

export default HeadButton;
