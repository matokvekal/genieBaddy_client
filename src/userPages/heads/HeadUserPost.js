import "./HeadUserPost.css";
import Button2 from "components/Button2/Button2";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";

function HeadUserPost({ post }) {
  const navigate = useNavigate();
  const { updateModalsStates } = useStore(useDataStore);

  function goBack() {
    // window.history.back();
    navigate('/');   
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

            </li>
            <li className="head-nick-name">{post.genie_nickname }(genie)</li>
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

export default HeadUserPost;
