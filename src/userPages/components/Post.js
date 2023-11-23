import { formatDate } from "utils/dateUtils";
import "./Post.css";
import { POST_STATUS } from "constants/jeneral";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import Button2 from "components/Button2/Button2";
import Button3 from "components/Button3/Button3";

function Post({ handleSelecPost, post }) {
  const { updateModalsStates } = useStore(useDataStore);
  const showConversation = () => {
    // updateModalsStates("sidebar","close")
    handleSelecPost(post);
  };
  const renderRatingIcons = () => {
    let icons = [];
    for (let i = 0; i < post.rating; i++) {
      icons.push(
        <img
          src={require(`assets/PNG/rubi-red.png`)}
          className="rubi-icon"
          alt="rubi"
        />
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
    <div className="post-row " onClick={showConversation}>
      <div className="row-left">
        <img
          src={require(`assets/PNG/avatars/avatar${
            post.user_avatar ? post.user_avatar : 1
          }.png`)}
          className="post-image-avatar"
          alt="user avatar"
        />
      </div>
      <div className="row-middle">
        <div className="row-middle-upper">
          <div className="row-middle-upper-left">
            {post.user_nickName ? post.user_nickName : "user"}
          </div>
          <div className="row-middle-upper-right">
            {renderRatingIcons()}
            {/* <img
              src={require(`assets/PNG/rubi-red.png`)}
              className="rubi-icon"
              alt="rubi"
            /> */}
          </div>
        </div>
        <div className="row-middle-middle">
          <Button2 text={post.user_header ? post.user_header : "General"} />
        </div>
        <div className="row-middle-bottom">{post.user_1}</div>
      </div>
      <div className="row-right">
        <div className="row-right-upper">{formatDate(post.created_at)}</div>
        
        {/*open  last_writen_by=genie_ user_read=0 */}
        <div className="row-right-middle circle circle-green">
          {countMessages()}
        </div>
        {/*open last_writen_by=genie_ user_read=1*/}
        <div className="row-right-middle circle circle-orange">
          {countMessages()}
        </div>
        {/*open last_writen_by=user_  */}
        <img
          src={require(`assets/PNG/vector.png`)}
          className="post-vector"
          alt="in conversation"
        />
        {/*open  post_status="new" */}
        <div className="row-right-bottom">
          <Button3 text={"NEW"} />
        </div>

        {/* else null */}
      </div>
    </div>
    // <div className="post-container" onClick={showData}>
    //   <img
    //     src={require(`assets/PNG/avatars/avatar${post.user_avatar}.png`)}
    //     className="post-image"
    //     alt="user avatar"
    //   />
    //   <div className="post-data">
    //     <div className="post-data left">
    //       <span>
    //         {post.post_status === POST_STATUS.CLOSED ? (
    //           <FontAwesomeIcon className="fa-icon red" icon={faCommentAlt} />
    //         ) : (
    //           <FontAwesomeIcon className="fa-icon green" icon={faCommentAlt} />
    //         )}
    //       </span>

    //       <span className="post-data left upper">
    //         {post.user_header ? post.user_header : post.user_1}
    //       </span>
    //       <span className="post-data left bottom">
    //         {" "}
    //         {post.user_1.length > 30
    //           ? `${post.user_1.slice(0, 30)}...`
    //           : post.user_1}
    //       </span>
    //     </div>
    //     <div className="post-data right">
    //       <div className="post-right rate">{renderRatingIcons()}</div>
    //       <div className="post-right info">
    //         <span className="post-right date ">
    //           {formatDate(post.created_at)}
    //         </span>
    //         <span className="post-right icon">{countMessages()}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Post;
