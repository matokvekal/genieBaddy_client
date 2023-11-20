import { useState, useEffect } from "react";
import { BsStar } from "react-icons/bs";
import { USERS_ROLES } from "constants";
import { PATHS_NAMES } from "constants";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const ChatRow = (props) => {
  const {
    id,
    topic_id,
    user_1_date,
    user_header,
    user_nickname,
    topic_name,
    last_writen_by,
  } = props.item;
  const _class =
    props.user === "genie" && last_writen_by === "user" ? "waiting" : "";

  const star = true;
  const navigate = useNavigate();
  // const { userType, handleSideBar, sideBarState } = useStore(useDataStore);
  const date = formatDate(user_1_date);

  const showPost = () => {
    navigate(`${PATHS_NAMES.CONVERSATION}/${id}`, { replace: false });
  };
  return (
    <div className={`chat-item ${_class}`}>
      <div className="chat-item-left">
        <div className="circle">
          <img src={require(`assets/PNG/avatars/avatar1.png`)} alt="avatar" />
          {/* <img src={require(`assets/PNG/${image}`)} alt="avatar" /> */}
        </div>
      </div>
      <div className="chat-item-middle">
        {_class ? "User is waiting for user to respond..." : ""}
        <div className="topic">{topic_id}</div>
        <div className="topicName">{topic_name}</div>
        <div className="header">{user_header}</div>
        <div className="bottom">
          <div className="date">{date}</div>
          {star && <BsStar className="star" />}
        </div>
      </div>
      <div className="chat-item-right">
        <div className="chevron" onClick={showPost}></div>
      </div>
    </div>
  );
};
export default ChatRow;
