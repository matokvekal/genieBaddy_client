import "./HeadGeniePost.css";
import Button2 from "components/Button2/Button2";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

function HeadGeniePost({ post }) {
  const { updateModalsStates } = useStore(useDataStore);

  function goBack() {
    window.history.back();
  }

  return (
    <>
      <div className="mainhead-userpost">
        {post && (
          <ul className="head-items">
            <li className="head-back-arrow" onClick={goBack}>
              <img
                src={require(`assets/PNG/left-arrow-circle.png`)}
                className="arrow-back"
                alt="arrow back"
              />
            </li>
            <li className="head-avatar">
              {post.genie_avatar && (
                <img
                  src={require(`assets/PNG/avatars/avatar${post.genie_avatar}.png`)}
                  className="postdata-image"
                  alt="user avatar"
                />
              )}
            </li>
            <li className="head-nick-name">{post.genie_nickname}</li>
            <li className="head-topic">
              <Button2 text={post?.topic_name} />
            </li>
            <li
              className="head-menu"
              onClick={() => {
                updateModalsStates("action", "toggle");
              }}
            >
              <img
                src={require(`assets/PNG/3dots.png`)}
                className="post-image"
                alt="3dots"
              />
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default HeadGeniePost;
