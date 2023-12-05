import "./HeadGeniePost.css";
import Button2 from "components/Button2/Button2";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";

function HeadGeniePost({ post }) {
  const navigate = useNavigate();
  const { updateModalsStates } = useStore(useDataStore);

  function goBack() {
    navigate('/');   
  }
  return (
    <>
      <div className="genie-mainhead-userpost">
        {post && (
          <ul className="genie-head-items">
            <li className="genie-head-back-arrow" onClick={goBack}>
              <img
                src={require(`assets/PNG/left-arrow-circle.png`)}
                className="genie-arrow-back"
                alt="arrow back"
              />
            </li>
            <li className="genie-head-nick-name">{post.user_nickname}(user)</li>
            <li className="genie-head-topic">
              <Button2 text={post?.topic_name} />
            </li>
            <li
              className="genie-head-menu"
              onClick={() => {
                updateModalsStates("action", "toggle");
              }}
            >
              <img
                src={require(`assets/PNG/3dots.png`)}
                className="genie-post-image"
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
