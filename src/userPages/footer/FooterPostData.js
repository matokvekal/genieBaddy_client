import ChatInput from "components/ChatInput/ChatInput";
function FooterPostData({  chatInput, setChatInput, sendChat, disabled ,hideTopics}) {           
  return (
    <>
      <div className="footer-postdata-main">
        {
          <ChatInput
            setChatInput={setChatInput}
            chatInput={chatInput}
            sendChat={sendChat}
            disabled={disabled}
            hideTopics={hideTopics}
          />
        }
      </div>
    </>
  );
}

export default FooterPostData;
