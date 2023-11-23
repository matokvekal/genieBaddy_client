import ChatInput from "components/ChatInput/ChatInput";
function FooterPostData({  chatInput, setChatInput, sendChat, disabled }) {           
  return (
    <>
      <div className="footer-postdata-main">
        {
          <ChatInput
            setChatInput={setChatInput}
            chatInput={chatInput}
            sendChat={sendChat}
            disabled={disabled}
          />
        }
      </div>
    </>
  );
}

export default FooterPostData;
