import { formatDate } from "utils/dateUtils";
import "./Post.css";
import { POST_STATUS } from "constants/jeneral";
import Button2 from "components/Button2/Button2";
import Button3 from "components/Button3/Button3";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import rubi from "assets/SVG/rubi-red.svg";    


function Post({ handleSelectPost, post }) {
  const showConversation = () => {
    updateModalsStates("all", "close");
    handleSelectPost(post);
  };

  const { updateModalsStates } = useStore(useDataStore);
  const renderRatingIcons = () => {
    let icons = [];
    for (let i = 0; i < post.rating; i++) {
      icons.push(
        <img
          src={rubi}
          className="rubi-icon"
          alt="rubi"
        />
      );
    }
    return icons;
  };

  const renderPostStatus = () => {
    if (post.post_status === POST_STATUS.NEW) {
      return (
        <div className="row-right-bottom">
          <Button3 text={"NEW"} />
        </div>
      );
    } else if (
      post.post_status === POST_STATUS.OPEN &&
      post.user_read === 0 &&
      post.last_writen_by.includes("genie_")
    ) {
      return (
        <div className="row-right-middle circle circle-green">
          {countMessages()}
        </div>
      );
    } else if (
      post.post_status === POST_STATUS.OPEN &&
      post.user_read === 1 &&
      post.last_writen_by.includes("genie_")
    ) {
      return (
        <div className="row-right-middle circle circle-orange">
          {countMessages()}
        </div>
      );
    } else if (
      post.post_status === POST_STATUS.OPEN &&
      post.last_writen_by.includes("user_")
    ) {
      return (
        <img
          src={require(`assets/PNG/vector.png`)}
          className="post-vector"
          alt="in conversation"
        />
      );
    } else {
      return null;
    }
  };

  const countMessages = () => {
    let messageCount = 0;
    const messageKeys = [
      "user_1",
      "genie_1",
      "user_2",
      "genie_2",
      "user_3",
      "genie_3",
    ];

    messageKeys.forEach((key) => {
      if (post[key] && post[key] !== "") {
        messageCount += 1;
      }
    });
    return messageCount;
  };
  return (
    <div className="post-row " onClick={showConversation}>
      <div className="row-left">
        {post.genie_avatar && <img
          src={require(`assets/PNG/avatars/avatar${
            post.genie_avatar
          }.png`)}
          className="post-image-avatar"
          alt="user avatar"
        />}
      </div>
      <div className="row-middle">
        <div className="row-middle-upper">
          <div className="row-middle-upper-left">
            {post.genie_nickname}
          </div>
          <div className="row-middle-upper-right">{renderRatingIcons()}</div>
        </div>
        <div className="row-middle-middle">
          <Button2 text={post.topic_name} />
        </div>
        <div className="row-middle-bottom">{post.user_1}</div>
      </div>
      <div className="row-right">
        <div className="row-right-upper">{formatDate(post.created_at)}</div>
        {renderPostStatus()}
      </div>
    </div>
  );
}

export default Post;
