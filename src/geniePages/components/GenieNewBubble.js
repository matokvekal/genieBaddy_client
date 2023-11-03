import React from "react";
import "./GenieNewBubble.css"; 

const GenieNewBubble = ({ sender, date, message, isMine }) => {
  return (
    <div className={`message-wrapper ${isMine ? "me" : "other"}`}>
      <div className="sender-details">
        <span className="sender-name">{sender}</span>
        <span className="message-date">{date}</span>
      </div>
      <div
        className={`message-bubble ${
          isMine ? "message-bubble-me" : "message-bubble-other"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default GenieNewBubble;
