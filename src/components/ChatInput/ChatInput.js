import React, { useRef } from "react";
import "./ChatInput.css";
import send from "assets/send.svg";
import { FaTimes } from "react-icons/fa";
import { appInfo } from "../../config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const ChatInput = ({ textInput, setTextInput, sendChat, disabled }) => {
  const maxCharacterLimit = appInfo.maxUserCharacterLimit; //////////////////////fix
  // const textAreaRef = useRef(null);
  const { updateModalsStates } = useStore(useDataStore);
  const textAreaRef = useRef(null);
  const clearText = () => {
    setTextInput("");
  };
  // useEffect(() => {
  //   if (textAreaRef.current) {
  //     textAreaRef.current.style.height = "0px";
  //     const scrollHeight = textAreaRef.current.scrollHeight;
  //     textAreaRef.current.style.height = scrollHeight + "px";
  //   }
  // }, [chatInput]);

  const handleInputChange = (event) => {
    updateModalsStates("all", "close");
    if (event.target.value.length > maxCharacterLimit) return;
    setTextInput(event.target.value);
    // Remove the fixed height when the user starts typing
    if (event.target.value.length > 0) {
      event.target.style.height = "auto"; // or any other height adjustment
      event.target.style.border = "1px solid lightgray";
    } else {
      event.target.style.height = "3rem"; // Reset to initial height if input is empty
    }
  };

  const handleSend = () => {
    if (textInput.trim() !== "") {
      sendChat(textInput.trim());
      setTextInput("");
    }
  };

  const handleBack = () => {
    setTextInput("");
    window.history.back();
  };

  return (
    <div className="chat-input">
      <div className="input-text">
        <textarea
          disabled={disabled}
          // ref={textAreaRef}
          className="chat-textarea"
          rows={textInput ? Math.min(textInput.split("\n").length, 7) : 0}
          value={textInput}
          placeholder={disabled ? "wait for genie's post" : "Type a message..."}
          onChange={handleInputChange}
        />

        <img
          onClick={handleSend}
          src={require(`assets/PNG/send1.png`)}
          className="send-icon"
          alt="send"
        />
      </div>
      <div className="chat-input-mic">
        <img
          src={require(`assets/PNG/mic.png`)}
          className="mic-icon"
          alt="mic"
        />
      </div>
      {/* <button onClick={handleBack} className="back-button">
        <BackIcon onClick={handleBack} />
      </button> */}

      {/* <div className="input-wrapper">
        <textarea
          disabled={disabled}
          ref={textAreaRef}
          className="chat-textarea"
          rows={chatInput ? Math.min(chatInput.split("\n").length, 7) : 0}
          value={chatInput}
          placeholder="Type a message..."
          onChange={handleInputChange}
        />
        {chatInput && (
          <button
            onClick={clearText}
            className="clear-text-button"
            disabled={disabled}
          >
            <FaTimes />
          </button>
        )}
      </div> */}

      {/* <button onClick={handleSend} className="send-button">
        <img src={send} className="chat-send-icon" />
      </button> */}
      {/* <div className="character-counter">{`${chatInput.length}/${maxCharacterLimit}`}</div> */}
    </div>
  );
};

export default ChatInput;
