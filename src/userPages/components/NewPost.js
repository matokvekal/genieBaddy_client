import { useState } from "react";
import "./NewPost.css";
import sendwhite from "assets/sendwhite.svg";
import { appInfo } from "../../config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import { FaTimes } from "react-icons/fa";
import PostData from "./PostData";
import { clearText } from "utils/clearText";
import UserTopics from "./UserTopics";
import Header from "../heads/Header";
import HeadNewPost from "userPages/heads/HeadNewPost";
import FooterPostData from "../footer/FooterPostData";

const NewPost = ({ handleCloseNewPostModal }) => {
  const { refreshUserPosts, updateUserLimits, triggerToast,updateModalsStates } =
    useStore(useDataStore);
  const maxCharacterLimit = Number(appInfo.maxUserCharacterLimit);
  // const [showTopics, setShowTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [disabledSend, setDisabledSend] = useState(false);
  const [textInput, setTextInput] = useState("");

  const avatar = localStorage.getItem("avatar");

  const sendChat = async () => {
    setDisabledSend(true);
    if (textInput.trim() !== "") {
      const sanitizedInput = clearText(textInput.trim());
      setTextInput(sanitizedInput);

      const res = await PostData({
        sanitizedInput,
        avatar,
        postId: "new",
        topic_id: selectedTopic ? selectedTopic.id : 1,
        header: null,
      });
      if (res?.status === 200) {
        triggerToast(
          "Message sent successfully. It may take a few minutes to process.",
          "success"
        );
        await updateUserLimits();
        await refreshUserPosts();
        handleCloseNewPostModal();
      } else {
        if (res?.status === 400 || res?.status === 406) {
          triggerToast(res.data?.error);
        } else {
          console.log("error");
          triggerToast("Message didn't send. Please try again.");
        }
        setDisabledSend(false);
      }
    }
  };

  const handleClose = () => {
    console.log("Posted:", textInput);
    handleCloseNewPostModal();
  };
  const handleInputChange = (event) => {
    if (event.target.value.length > maxCharacterLimit) return;
    setTextInput(event.target.value);
  };
  const handleSend = () => {
    if (textInput.trim() !== "") {
      sendChat(textInput.trim());
    }
  };
  const HandleremoveTopic = (e) => {
    e.stopPropagation();
    setSelectedTopic(null);
  };

  return (
    <>
      {
        <div className="newpost-main">
          <Header />
          <HeadNewPost

            topicName={selectedTopic.topic_name}
            handleCloseNewPostModal={handleCloseNewPostModal}
          />
          <UserTopics
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
          <div className="newpost-content"
          onClick={()=>updateModalsStates("usertopics", "close")}></div>  

          <div className="newpost-footer">
            <FooterPostData
              setTextInput={setTextInput}
              textInput={textInput}
              sendChat={sendChat}
              // disabled={disabled}
            />
          </div>
          {/* <div className="new-post-header">
            <span>Write Post</span>
            <span>Your post is anonymous and private.</span>
            <button onClick={handleClose}>✖️</button>
          </div>
          <textarea
            className="new-post-input"
            value={postText}
            onChange={handleInputChange}
            placeholder="Share your thoughts"
          /> */}

          {/* <div className="new-post-footer">
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
          </div> */}
        </div>
      }
    </>
  );
};

export default NewPost;
