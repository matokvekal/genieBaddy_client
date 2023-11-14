import React from "react";
import { useStore } from "zustand";
import useDataStore from "../../stores/appStore";


const HeadButton = ({ active, name, posts, setConvFilter }) => {
  const { toggleSideBar } = useStore(useDataStore);
  const handleCick=(e)=>{
    e.stopPropagation();
    toggleSideBar(false);
    setConvFilter();
  }
  return (
    <div
      className={`chat-button ${active ? "active" : ""}`}
      onClick={handleCick}
    >
      <div className="chat-button-name">{name}</div>
      <div className={`chat-button-posts ${active ? "active" : ""}`}>
        {posts}
      </div>
    </div>
  );
};

export default HeadButton;
