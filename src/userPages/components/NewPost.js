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
            />
          </div>
        </div>
      }
    </>
  );
};

export default NewPost;
