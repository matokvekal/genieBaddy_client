import { useState, useEffect } from "react";
import "./UserPostData.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import Header from "../heads/Header";
import HeadUserPost from "userPages/heads/HeadUserPost";
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
import { useNavigate } from "react-router-dom";

const UserPostData = () => {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const { updateModalsStates } = useStore(useDataStore);
  const [placeHolderText, setPlaceHolderText] = useState("");
  // const handleInputChange = (value) => {
  //   setTextInput(value);
  // };
  const { postId, userPosts, refreshUserPosts, userPostChat } =
    useStore(useDataStore);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!postId) {
      navigate("/");
    }
  }, [postId, navigate]);

  const sendChat = async () => {
    
    if (textInput.trim() !== "") {
      const sanitizedInput = clearText(textInput.trim());
      console.log(sanitizedInput);
      setDisabled(true);
      const res = await userPostChat({
        sanitizedInput,
        postId: postId,
        topic_id: null,
        header: null,
      });
      if (res.status === 200) {
        const result = await refreshUserPosts();
        console.log(result);
        navigate("/");
      }
    }
  };

  const post =
    userPosts && userPosts[0] ? userPosts.find((x) => x.id === postId) : null;
  const maxMessages = userLimits.maxMessages;

  useEffect(() => {
    if (post) {
      let isDisabled = true;
      let placeholder = "Wait for genie";
      if (
        post.last_writen_by === "genie_3" ||
        post.post_status === POST_STATUS.CLOSED
      ) {
        placeholder = "Post is closed";
      } else if (post.last_writen_by?.includes("genie")) {
        placeholder = "Type your message here";
        isDisabled = false;
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
    // window.history.back();
    navigate("/");
  }
  const handleClick = () => {
    updateModalsStates("action", "close");
  };
  return (
    <>
      <Sidebar />
      <div className="postdata-main">
        <Header />
        <HeadUserPost post={post} />
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
                      isMine={true}
                      avatar={post["user_avatar"]}
                    />
                  )}
                  {hasValue(data[`genie_${index + 1}`]) && (
                    <MessageBubble
                      sender={post["genie_nickname"]}
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

export default UserPostData;
