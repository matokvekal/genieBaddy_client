import { useState ,useEffect} from "react";
import "./GeniePostData.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import HeadUserPost from "userPages/heads/HeadUserPost";
import { ChatInput } from "components";
import MessageBubble from "./MessageBubble";
import { formatDate } from "utils/dateUtils";
import { clearText } from "utils/clearText";
import { POST_STATUS } from "constants";
import PostData from "./PostData";
import { hasValue } from "../../utils/hasValue";
import {userLimits} from "config/config.js";

const GeniePostData = () => {
  const [chatInput, setChatInput] = useState("");
  const { postId, allPosts,refreshGeniePosts } = useStore(useDataStore);
  const[disabled,setDisabled]=useState(false)

  const sendChat = async () => {
    if (chatInput.trim() !== "") {
      const sanitizedInput = clearText(chatInput.trim());
      const res = await PostData({
        sanitizedInput,
        postId: postId,
        topic_id: null,
        header: null,
      });
      if (res.status === 200) {
        const result = await refreshGeniePosts();
        console.log(result);
        window.history.back();
      }
    }
  };

  const post =
    allPosts && allPosts[0] ? allPosts.find((x) => x.id === postId) : null;
  const maxMessages =userLimits.maxMessages;
  useEffect(() => {
    if (post && post.last_writen_by && post.last_writen_by.includes("genie")) {
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
      <div className="post-page">
        <HeadUserPost />

        {post && (
          <>
            <div>{post.postId}</div>
            <div className="post-content">
              {postData &&
                postData.map((post, index) => (
                  <div key={index}>
                    {hasValue(post[`user_${index + 1}`]) && (
                      <MessageBubble
                        sender={
                          post.user_nickname ? post.user_nickname : "User"
                        }
                        date={formatDate(post[`user_${index + 1}_date`])}
                        message={post[`user_${index + 1}`]}
                        isMine={true}
                      />
                    )}
                    {hasValue(post[`genie_${index + 1}`]) && (
                      <MessageBubble
                        sender={
                          post.genie_nickname ? post.genie_nickname : "Genie"
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GeniePostData;
