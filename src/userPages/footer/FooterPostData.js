import ChatInput from "components/ChatInput/ChatInput";
function FooterPostData({ textInput, setTextInput, sendChat, disabled }) {       
  return (
    <>
      <div className="footer-postdata-main">
        {
          <ChatInput
          setTextInput={setTextInput}
          textInput={textInput}
            sendChat={sendChat}
            disabled={disabled}
          />
        }
      </div>
    </>
  );
}

export default FooterPostData;
