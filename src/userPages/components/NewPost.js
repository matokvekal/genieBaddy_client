//befor open the page chect at localstorage the counter and the date(we move to 0 at 2400 utc) and the user_posts_per_day
//ifthe counter less than user_posts_per_day in same day  we open page, if day is before today we set counter to 0 and open page
//if the day is today and counter === to user_post_per_day we show amessage to wait for  tommorow we have to considure the utc time
//if we open page
//at server we check amount from genie_config we take from user utc , then count his posts with same logic as client
//if the amount is equal than user_posts_per_day we open page if not we show message to wait for tommorow
//if we save message  we send count  to client so client will update  his local storage(client and server worked with utc datetime )

import { useState } from "react";
import "./NewPost.css";
import sendwhite from "assets/sendwhite.svg";
import { appInfo } from "../../config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { FaTimes } from "react-icons/fa";
import PostData from "./PostData";
import { clearText } from "utils/clearText";
import UserTopics from "./Topics";



const NewPost = ({ handleCloseNewPostModal }) => {
  const [postText, setPostText] = useState("");
  const { refreshUserPosts, updateUserLimits ,triggerToast} = useStore(useDataStore);
  const maxCharacterLimit = Number(appInfo.maxUserCharacterLimit);
  const [showTopics, setShowTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [disabledSend, setDisabledSend] = useState(false);

  const handleTopic = () => {
    setShowTopics(true);
  };

  const sendChat = async () => {
    debugger
    setDisabledSend(true);
    if (postText.trim() !== "") {
      const sanitizedInput = clearText(postText.trim());
      setPostText(sanitizedInput);
      const avatar = localStorage.getItem("avatar");
      const res = await PostData({
        sanitizedInput,
        avatar,
        postId: "new",
        topic_id: selectedTopic ? selectedTopic.id : null,
        header: null,
      });
      if (res?.status === 200) {
        triggerToast("Message sent successfully. It may take a few minutes to process.",'success');
        await updateUserLimits();
        await refreshUserPosts();
        handleCloseNewPostModal();

        
      } else {
        if(res?.status === 400 || res?.status === 406){
          triggerToast(res.data?.error);
        }else{
        console.log("error");
        triggerToast("Message didn't send. Please try again.");
      }
      setDisabledSend(false);
    }}
  };

  const handleClose = () => {
    console.log("Posted:", postText);
    handleCloseNewPostModal();
  };
  const clean = () => {
    setPostText(""); // clear function
  };
  const handleInputChange = (event) => {
    if (event.target.value.length > maxCharacterLimit) return;
    setPostText(event.target.value);
  };
  const handleSend = () => {
    if (postText.trim() !== "") {
      sendChat(postText.trim());
    }
  };
  const HandleremoveTopic = (e) => {
    e.stopPropagation();
    setSelectedTopic(null);
  };

  return (
    <>
      {!showTopics && (
        <div className="new-post-container">


          <div className="new-post-header">
            <span>Write Post</span>
            <span>Your post is anonymous and private.</span>
            <button onClick={handleClose}>✖️</button>
          </div>
          <textarea
            className="new-post-input"
            value={postText}
            onChange={handleInputChange}
            placeholder="Share your thoughts"
          />
          {postText && (
            <button onClick={clean} className="clear-new-chat-button">
              <FaTimes />
            </button>
          )}
          <div className="new-post-footer">
            <button
              onClick={handleSend}
              className="send-button"
              disabled={disabledSend}
            >
              <img src={sendwhite} className="chat-send-icon" alt="send" />
            </button>
            <div
              className="topic"
              onClick={handleTopic}
              style={{
                backgroundColor: selectedTopic ? selectedTopic.color : "",
              }}
            >
              {selectedTopic ? selectedTopic.topic_name : "Topic +"}
              <span className="remove-topic" onClick={HandleremoveTopic}>
                X
              </span>
            </div>
          </div>
        </div>
      )}
      {showTopics && (
        <UserTopics
          showTopic={showTopics}
          setShowTopics={setShowTopics}
          setSelectedTopic={setSelectedTopic}
        />
      )}
    </>
  );
};

export default NewPost;
