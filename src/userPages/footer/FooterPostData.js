import ChatInput from "components/ChatInput/ChatInput";
function FooterPostData({ post, chatInput, setChatInput, sendChat, disabled }) {
  return (
    <>
      <div className="footer-postdata-main">
        {
          // {post.post_status === POST_STATUS.OPEN && (
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
