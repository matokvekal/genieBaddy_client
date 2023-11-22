import "./HeadUserPost.css";
import Button2 from "components/Button2/Button2";


function HeadUserPost({ post }) {
  // const { getNickName } = useStore(useDataStore);
  // const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || 1);
  // const NickName = getNickName();

  function goBack() {
    window.history.back();
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
              src={require(`assets/PNG/avatars/avatar${post.user_avatar?post.user_avatar:1}.png`)}
              className="postdata-image"
              alt="user avatar"
            />
          </li>
          <li className="head-nick-name">{post.user_nickname || "user"}</li>
          <li className="head-topic">
            <Button2 text={post.user_header ? post.user_header : "General"} />
          </li>
          <li className="head-menu">
            <img
              src={require(`assets/PNG/3dots.png`)}
              className="post-image"
              alt="3dots"
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeadUserPost;
