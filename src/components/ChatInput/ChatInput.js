import React from "react";
import "./ChatInput.css";

import { appInfo } from "../../config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const ChatInput = ({
  textInput,
  setTextInput,
  sendChat,
  disabled,
  placeholder,
}) => {
  const maxCharacterLimit = appInfo.maxUserCharacterLimit;

  const { updateModalsStates } = useStore(useDataStore);

  const handleInputChange = (event) => {
    updateModalsStates("all", "close");
    if (event.target.value.length > maxCharacterLimit) return;
    setTextInput(event.target.value);
    if (event.target.value.length > 0) {
      event.target.style.height = "auto"; // or any other height adjustment
      event.target.style.border = "1px solid lightgray";
    } else {
      event.target.style.height = "3rem"; // Reset to initial height if input is empty
    }
  };

  const handleSend = () => {
    updateModalsStates("all", "close");
    if (textInput.trim() !== "") {
      sendChat(textInput.trim());
      setTextInput("");
    }
  };
  return (
    <div className="chat-input">
      <div className="input-text">
        <textarea
          disabled={disabled}
          className="chat-textarea"
          rows={textInput ? Math.min(textInput.split("\n").length, 7) : 0}
          value={textInput}
          placeholder={placeholder}
          onChange={handleInputChange}
        />

        {!disabled && (
          <img
            onClick={handleSend}
            src={require(`assets/PNG/send1.png`)}
            className="send-icon"
            alt="send"
          />
        )}
      </div>
      <div className="chat-input-mic">
        <img
          src={require(`assets/PNG/mic.png`)}
          className="mic-icon"
          alt="mic"
        />
      </div>
    </div>
  );
};

export default ChatInput;
