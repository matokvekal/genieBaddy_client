import React from "react";

const HeadButton = ({ active, name, posts, setConvFilter }) => {
  return (
    <div
      className={`chat-button ${active ? "active" : ""}`}
      onClick={setConvFilter}
    >
      <div className="chat-button-name">{name}</div>
      <div className={`chat-button-posts ${active ? "active" : ""}`}>
        {posts}
      </div>
    </div>
  );
};

export default HeadButton;
