import React, { useRef, useEffect } from "react";
import "./ChatInput.css";
import send from "assets/send.svg";
import {
  FaTimes,
} from "react-icons/fa";
import {appInfo} from "../../config/config"

const BackIcon = () => <span>{"<"}</span>;

const ChatInput = ({ setChatInput, chatInput, sendChat }) => {
  const maxCharacterLimit = appInfo.maxUserCharacterLimit;//////////////////////fix
  const textAreaRef = useRef(null);
  const clearText = () => {
    setChatInput(""); 
  };
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [chatInput]);

  const handleInputChange = (event) => {
    if (event.target.value.length > maxCharacterLimit) return;
    setChatInput(event.target.value);
  };

  const handleSend = () => {
    if (chatInput.trim() !== "") {
      sendChat(chatInput.trim());
      setChatInput("");
    }
  };

  const handleBack = () => {
    setChatInput("");
    window.history.back();
  };

  return (
    <div className="chat-input">
      <button onClick={handleBack} className="back-button">
        <BackIcon onClick={handleBack} />
      </button>

      <div className="input-wrapper">
        <textarea
          ref={textAreaRef}
          className="chat-textarea"
          rows={chatInput ? Math.min(chatInput.split("\n").length, 7) : 0}
          value={chatInput}
          placeholder="Type a message..."
          onChange={handleInputChange}
        />
        {chatInput && (
          <button onClick={clearText} className="clear-text-button">
            <FaTimes />
          </button>
        )}
      </div>

      <button onClick={handleSend} className="send-button">
        <img src={send} className="chat-send-icon" />
      </button>
      {/* <div className="character-counter">{`${chatInput.length}/${maxCharacterLimit}`}</div> */}
    </div>
  );
};

export default ChatInput;
