import ChatInput from "components/ChatInput/ChatInput";
function FooterPostData({
  textInput,
  setTextInput,
  sendChat,
  disabled,
  placeholder,
}) {
  return (
    <>
      <div className="footer-postdata-main">
        {
          <ChatInput
            setTextInput={setTextInput}
            textInput={textInput}
            sendChat={sendChat}
            disabled={disabled}
            placeholder={placeholder}
          />
        }
      </div>
    </>
  );
}

export default FooterPostData;
