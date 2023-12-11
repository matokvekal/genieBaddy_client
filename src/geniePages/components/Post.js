import { formatDate } from "utils/dateUtils";
import "./Post.css";
import { POST_STATUS } from "constants/jeneral";
import Button2 from "components/Button2/Button2";
import Button3 from "components/Button3/Button3";

function Post({ handleSelectPost, post }) {
  const {
    rating,
    post_status,
    last_writen_by,
    genie_read,
    user_nickname,
    user_avatar,
    topic_name,
    created_at,
    user_1,
  } = post;
  console.log("Post:", post);

  const showConversation = () => {
    handleSelectPost(post);
  };

  const renderRatingIcons = () => {
    let icons = [];
    for (let i = 0; i < rating; i++) {
      icons.push(
        <img
          src={require(`assets/PNG/rubi_red.png`)}
          className="rubi-icon"
          alt="rubi"
        />
      );
    }
    return icons;
  };

  const renderPostStatus = () => {
    if (
      post_status === POST_STATUS.OPEN &&
      last_writen_by?.includes("user_1")
    ) {
      return (
        <div className="">
          <Button3 text={"NEW"} />
        </div>
      );
    } else if (
      post_status === POST_STATUS.OPEN &&
      genie_read === 0 &&
      last_writen_by?.includes("user_")
    ) {
      return (
        <div className="genie-circle genie-circle green">
          {messageKeys[post.last_writen_by]}
        </div>
      );
    } else if (
      post_status === POST_STATUS.OPEN &&
      genie_read === 1 &&
      last_writen_by?.includes("user_")
    ) {
      return (
        <div className="genie-circle genie-circle orange">
          {messageKeys[post.last_writen_by]}
        </div>
      );
    } else if (
      post_status === POST_STATUS.OPEN &&
      last_writen_by?.includes("genie_")
    ) {
      return (
        <img
          src={require(`assets/PNG/vector.png`)}
          className="post-vector"
          alt="in conversation"
        />
      );
    }
  };

  const messageKeys = {
    user_1: 1,
    genie_1: 2,
    user_2: 3,
    genie_2: 4,
    user_3: 5,
    genie_3: 6,
  };

  return (
    <div className="genie-post-row" onClick={showConversation}>
      <div className="genie-row-left">
        {post.user_avatar && (
          <img
            src={require(`assets/PNG/avatars/avatar${user_avatar}.png`)}
            className="genie-post-image-avatar"
            alt="user avatar"
          />
        )}
      </div>
      <div className="genie-row-middle">
        <div className="genie-row-middle-upper">
          <div className="genie-row-middle-upper-left">{user_nickname}</div>
          <div className="genie-row-middle-upper-right">
            {renderRatingIcons()}
          </div>
        </div>
        <div className="genie-row-middle-middle">
          <Button2 text={topic_name} />{" "}
        </div>
        <div className="genie-row-middle-bottom">{user_1}</div>
      </div>
      <div className="genie-row-right">
        <div className="genie-row-right-upper">{formatDate(created_at)}</div>
        <div className="genie-row-right-bottom"> {renderPostStatus()}</div>
      </div>
    </div>
  );
}

export default Post;
