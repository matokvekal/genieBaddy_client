import { useState, useEffect } from "react";
import "./UserPostData.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import Header from "../heads/Header";
import "./UserPostData.css";
import HeadUserPost from "userPages/heads/HeadUserPost";
import { ChatInput } from "components";
import MessageBubble from "./MessageBubble";
import { formatDate } from "utils/dateUtils";
import { clearText } from "utils/clearText";
import { POST_STATUS } from "constants/jeneral";
import PostData from "./PostData";
import { hasValue } from "../../utils/hasValue";
import { userLimits } from "config/config.js";
import FooterPostData from "../footer/FooterPostData";
import PostModal from "components/PostModal/PostModal";

const UserPostData = () => {
  const [chatInput, setChatInput] = useState("");
  const handleInputChange = (value) => {
    setChatInput(value);
  };
  const { postId, allPosts, refreshUserPosts } = useStore(useDataStore);
  const [disabled, setDisabled] = useState(false);
  if (!postId) {
    window.history.back();
  }
  const sendChat = async () => {
    if (chatInput.trim() !== "") {
      const sanitizedInput = clearText(chatInput.trim());
      console.log(sanitizedInput);
      setDisabled(true);
      const res = await PostData({
        sanitizedInput,
        postId: postId,
        topic_id: null,
        header: null,
      });
      if (res.status === 200) {
        const result = await refreshUserPosts();
        console.log(result);
        window.history.back();
      }
    }
  };

  const post =
    allPosts && allPosts[0] ? allPosts.find((x) => x.id === postId) : null;
  const maxMessages = userLimits.maxMessages;

  useEffect(() => {
    if (post && post.last_writen_by && post.last_writen_by.includes("user")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [post]);
  const processTalkData = (post) => {
    const result = [];

    for (let i = 1; i <= maxMessages; i++) {
      const userKey = `user_${i}`;
      const userDateKey = `user_${i}_date`;
      const genieKey = `genie_${i}`;
      const genieDateKey = `genie_${i}_date`;

      if (post[userKey] || post[genieKey]) {
        const talk = {
          [userKey]: post[userKey] || null,
          [userDateKey]: post[userDateKey] || null,
          [genieKey]: post[genieKey] || null,
          [genieDateKey]: post[genieDateKey] || null,
        };
        result.push(talk);
      } else {
        break;
      }
    }
    return result;
  };
  let postData = null;
  if (post) {
    postData = processTalkData(post);
  }
  return (
    <>
      <div className="postdata-main">
        <Header />
        {/* <div className="postdata-main"> */}
        <HeadUserPost
          post={post}
          // setChatInput={setChatInput}
          // chatInput={chatInput}
          // disabled={disabled}
        />
        <PostModal />

        <div className="postdata-content">
          <div className="post-content">
            {postData &&
              postData.map((data, index) => (
                <div key={index}>
                  {hasValue(data[`user_${index + 1}`]) && (
                    <MessageBubble
                      sender={post["user_nickname"]}
                      date={formatDate(data[`user_${index + 1}_date`])}
                      message={data[`user_${index + 1}`]}
                      isMine={true}
                      avatar={post["user_avatar"]}
                    />
                  )}
                  {hasValue(data[`genie_${index + 1}`]) && (
                    <MessageBubble
                      sender={post["user_nickname"]}
                      date={formatDate(data[`genie_${index + 1}_date`])}
                      message={data[`genie_${index + 1}`]}
                      isMine={false}
                      avatar={post["genie_avatar"]}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="postdata-footer">
          <FooterPostData
            // post={post}
            setChatInput={setChatInput}
            chatInput={chatInput}
            disabled={disabled}
          />
        </div>
        {/* <HeadUserPost /> */}
        {/* <HeadUserPost post={post} />
        {post && ( */}

        {/* <div>{post.postId}</div>
            <div className="post-content">
              {postData &&
                postData.map((post, index) => (
                  <div key={index}>
                    {hasValue(post[`user_${index + 1}`]) && (
                      <MessageBubble
                        sender={post.user_nickname ? post.user_nickname : "you"}
                        date={formatDate(post[`user_${index + 1}_date`])}
                        message={post[`user_${index + 1}`]}
                        isMine={true}
                      />
                    )}
                    {hasValue(post[`genie_${index + 1}`]) && (
                      <MessageBubble
                        sender={
                          post.genie_nickname ? post.genie_nickname : "genie"
                        }
                        date={formatDate(post[`genie_${index + 1}_date`])}
                        message={post[`genie_${index + 1}`]}
                        isMine={false}
                      />
                    )}
                  </div>
                ))}
            </div>

            <div className="post-footer">
              <div className="action">
                {post.post_status === POST_STATUS.OPEN && (
                  <ChatInput
                    setChatInput={setChatInput}
                    chatInput={chatInput}
                    sendChat={sendChat}
                    disabled={disabled}
                  />
                )}
                <div className="chat-input-container"></div>
                <div className="chat-icons"></div>
              </div>
            </div> */}
      </div>
    </>
  );
};

export default UserPostData;
