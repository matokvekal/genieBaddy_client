import { formatDate } from "utils/dateUtils";
import { POST_STATUS } from "constants/jeneral";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Post({ handleSelecPost, post }) {
  const { toggleSideBar } = useStore(useDataStore);
  const showData = () => {
    // console.log("props.post", post);
    toggleSideBar(false);
    handleSelecPost(post);
  };
  const renderRatingIcons = () => {
    let icons = [];
    for (let i = 0; i < post.rating; i++) {
      icons.push(
        <span key={i} className="diamond-icon">
          ♦
        </span>
      );
    }
    return icons;
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
    <div
      className={`post-container ${!post["genie_1"] ? "new" : ""}`}
      onClick={showData}
    >
      {/* <div className="post-container" onClick={showData}> */}
      <img
        src={require(`assets/PNG/avatar${post.user_avatar}.png`)}
        className="post-image"
        alt="user avatar"
      />

      <div className="post-data">
        <div className="post-data left">
          {post.id}
          <span>
            {post.post_status === POST_STATUS.CLOSED ? (
              <FontAwesomeIcon className="fa-icon red" icon={faCommentAlt} />
            ) : (
              <FontAwesomeIcon className="fa-icon green" icon={faCommentAlt} />
            )}
          </span>

          <span className="post-data left upper">
            {post.user_header ? post.user_header : post.user_1}
          </span>
          <span className="post-data left bottom">{post.user_1}</span>
        </div>
        <div className="post-data right">
          <div className="post-right rate">{renderRatingIcons()}</div>
          <div className="post-right info">
            <span className="post-right date ">
              {formatDate(post.created_at)}
            </span>
            <span className="post-right icon">{countMessages()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
