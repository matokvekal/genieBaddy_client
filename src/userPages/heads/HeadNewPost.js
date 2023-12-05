import { useState } from "react";
import "./HeadNewPost.css";
import Button2 from "components/Button2/Button2";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";

function HeadUserPost({ topicName,handleCloseNewPostModal }) {
  const navigate = useNavigate();
  const { getNickName,updateModalsStates } = useStore(useDataStore);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || 1);
  const NickName = getNickName();
  function goBack() {
    updateModalsStates("usertopics", "close")
    handleCloseNewPostModal()
    navigate('/');   
  }
  return (
    <>
      <div className="mainhead-userpost">
        <ul className="head-items">
          <li className="head-back-arrow" onClick={goBack}>
            <img
              src={require(`assets/PNG/left-arrow-circle.png`)}
              className="arrow-back"
              alt="arrow back"
            />
          </li>
          <li className="head-avatar">
            <img
              src={require(`assets/PNG/avatars/avatar${
                avatar ? avatar : 1
              }.png`)}
              className="postdata-image"
              alt="user avatar"
            />
          </li>
          <li className="head-nick-name">{NickName}</li>
          <li className="head-topic" onClick={()=>updateModalsStates("usertopics", "toggle")} >
            <Button2 text={topicName?topicName:"Choose topic"} />
          </li>

        </ul>
      </div>
    </>
  );
}

export default HeadUserPost;
