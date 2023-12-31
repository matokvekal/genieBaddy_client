import { useState } from "react";
import "./NewPost.css";
import { appInfo } from "../../config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import { FaTimes } from "react-icons/fa";
// import PostData from "./PostData";
import { clearText } from "utils/clearText";
import UserTopics from "./UserTopics";
import Header from "../heads/Header";
import HeadNewPost from "userPages/heads/HeadNewPost";
import FooterPostData from "../footer/FooterPostData";
import { useTranslation } from "react-i18next";

const NewPost = ({ handleCloseNewPostModal }) => {
  const {
    refreshUserPosts,
    updateUserLimits,
    triggerToast,
    updateModalsStates,
    getUserNickName,
    userPostChat,
  } = useStore(useDataStore);
  const maxCharacterLimit = Number(appInfo.maxUserCharacterLimit);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [disabledSend, setDisabledSend] = useState(false);
  const [textInput, setTextInput] = useState("");
  const { t } = useTranslation();


  const sendChat = async () => {
    setDisabledSend(true);
    const avatar = localStorage.getItem("avatar");
    const userNickName = getUserNickName();    if (textInput.trim() !== "") {
      const sanitizedInput = clearText(textInput.trim());
      setTextInput(sanitizedInput);


  const res = await userPostChat({
    sanitizedInput,
    avatar,
    postId: "new",
    topic_id: selectedTopic ? selectedTopic.id : 1,
    header: null,
    userNickName: userNickName,
  });
  if (res?.status === 200 && res.data.status === "success") {
    triggerToast(
      "Message sent successfully. It may take a few minutes to process.",
      "success"
    );
    await updateUserLimits();
    await refreshUserPosts();
    handleCloseNewPostModal();
  } else if (res?.status === 200 && res.data.status === "limitReached") {
    triggerToast("Daily post limit reached, try again tomorrow.", "error");
  } else {
    if (res?.status === 400 || res?.status === 406) {
      triggerToast(res.data?.error);
    } else {
      console.log("error");
      triggerToast("Message didn't send. Please try again.", "error");
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
            topicName={t(selectedTopic.topic_name)}
            handleCloseNewPostModal={handleCloseNewPostModal}
          />
          <UserTopics
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
          <div
            className="newpost-content"
            onClick={() => updateModalsStates("usertopics", "close")}
          ></div>

          <div className="newpost-footer">
          <FooterPostData
              setTextInput={setTextInput}
              textInput={textInput}
              sendChat={sendChat}
              placeholder={"Type  message "}
            />
          </div>
        </div>
      }
    </>
  );
};

export default NewPost;
