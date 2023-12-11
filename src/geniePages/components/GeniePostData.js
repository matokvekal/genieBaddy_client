import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./GeniePostData.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import Header from "../heads/Header";
import HeadGeniePost from "../heads/HeadGeniePost";
import MessageBubble from "./MessageBubble";
import { formatDate } from "utils/dateUtils";
import { clearText } from "utils/clearText";
import { POST_STATUS } from "constants/jeneral";
// import PostData from "./PostData";
import { hasValue } from "../../utils/hasValue";
import { userLimits } from "config/config.js";
import FooterPostData from "../footer/FooterPostData";
import ActionModal from "modals/ActionModal/ActionModal";
import Sidebar from "modals/UserSidebar";

const GeniePostData = () => {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [placeHolderText, setPlaceHolderText] = useState("");

  const {
    postId,
    geniePosts,
    refreshGeniePosts,
    updateModalsStates,
    geniePostChat,
  } = useStore(useDataStore);
  const [disabled, setDisabled] = useState(false);
  if (!postId) {
    console.log("no post id");
    navigate("/");
    // window.history.back();
  }
  const sendChat = async () => {
    if (textInput.trim() !== "") {
      const sanitizedInput = clearText(textInput.trim());
      console.log(sanitizedInput);
      setDisabled(true);
      const res = await geniePostChat({
        sanitizedInput,
        postId: postId,
      });
      if (res.status === 200) {
        const result = await refreshGeniePosts();
        console.log(result);
        navigate("/");
        // window.history.back();
      }
    }
  };
  const post =
    geniePosts && geniePosts[0] ? geniePosts.find((x) => x.id === postId) : null;
  const maxMessages = userLimits.maxMessages;

  useEffect(() => {
    if (post) {
      let isDisabled = true;
      let placeholder = "wait for user";

      if (post.last_writen_by?.includes("user")) {
        isDisabled = false;
        placeholder = "Type your message here";
      } else if (
        post.last_writen_by === "genie_3" ||
        post.post_status === POST_STATUS.CLOSED
      ) {
        placeholder = "Post is closed";
      }

      setDisabled(isDisabled);
      setPlaceHolderText(placeholder);
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
  if (post && processTalkData(post)) {
    postData = processTalkData(post);
  } else {
    navigate("/");
    // window.history.back();
  }
  const handleClick = () => {
    updateModalsStates("action", "close");
  };

  return (
    <>
      <Sidebar />
      <div className="postdata-main">
        <Header />
        <HeadGeniePost post={post} />
        <ActionModal post={post} />

        <div className="postdata-content" onClick={handleClick}>
          <div className="post-content">
            {postData &&
              postData.map((data, index) => (
                <div key={index}>
                  {hasValue(data[`user_${index + 1}`]) && (
                    <MessageBubble
                      sender={post["user_nickname"]}
                      date={formatDate(data[`user_${index + 1}_date`])}
                      message={data[`user_${index + 1}`]}
                      isMine={false}
                      avatar={post["user_avatar"]}
                    />
                  )}
                  {hasValue(data[`genie_${index + 1}`]) && (
                    <MessageBubble
                      sender={post["genie_nickname"]}
                      date={formatDate(data[`genie_${index + 1}_date`])}
                      message={data[`genie_${index + 1}`]}
                      isMine={true}
                      avatar={post["genie_avatar"]}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="postdata-footer">
          <FooterPostData
            sendChat={sendChat}
            setTextInput={setTextInput}
            textInput={textInput}
            disabled={disabled}
            placeholder={placeHolderText}
          />
        </div>
      </div>
    </>
  );
};

export default GeniePostData;
