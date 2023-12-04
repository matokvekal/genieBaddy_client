import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ sender, date, message, isMine, avatar }) => {
  return (
    <div className={`message-wrapper ${isMine ? "me" : "other"}`}>
      <div className={`message-details ${isMine ? "me" : "other"}`}>
        <div className={`sender-details ${isMine ? "me" : "other"}`}>
          {avatar && (
            <img
              src={require(`assets/PNG/avatars/avatar${avatar}.png`)}
              className="bubble-image"
              alt=" avatar"
            />
          )}
          <span className={`message-sender-name ${isMine ? "me" : "other"}`}>
            {sender}
            {`${isMine ? "(me)" : "(jenie)"}`}
          </span>
          <span className={`message-message-date ${isMine ? "me" : "other"}`}>
            {date}
          </span>
        </div>
      </div>
      <div className={`message-data ${isMine ? "me" : "other"}`}>{message}</div>
    </div>
  );
};

export default MessageBubble;
