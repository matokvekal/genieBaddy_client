import "./HeadGenieClaim.css";
import Button2 from "components/Button2/Button2";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useTranslation } from "react-i18next";

function HeadGenieClaim({ post }) {
  const { updateModalsStates} =
    useStore(useDataStore);
    const { t } = useTranslation();
  return (
    <>
        <ul className="genie-head-items">
          <li className="genie-head-avatar">
            {post.user_avatar && (
              <img
                src={require(`assets/PNG/avatars/avatar${post.user_avatar}.png`)}
                className="genie-postdata-image"
                alt="user avatar"
              />
            )}
          </li>
          <li className="genie-head-nick-name">{post.user_nickname}</li>
          <li className="genie-head-topic">
            <Button2 text={t(post?.topic_name)} />
          </li>
          <li
            className="genie-head-menu"
            onClick={() => {
              updateModalsStates("action", "toggle");
            }}
          >
            {(
              <img
                src={require(`assets/PNG/3dots.png`)}
                className="genie-post-image"
                alt="3dots"
              />
            )}
          </li>
        </ul>
    </>
  );
}

export default HeadGenieClaim;
