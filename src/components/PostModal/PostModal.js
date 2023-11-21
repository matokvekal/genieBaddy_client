import "./PostModal.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const PostModal = () => {
  const { handlePostModal, postModatState } = useStore(useDataStore);

  return (
    <>
      <div className={`post-modal ${postModatState ? "open" : ""}`}>
        <div className="post-modal-container">
          <div className="row feedBack">
            <img src={require(`assets/PNG/rubi-red.png`)} alt="save" />
            <div>give aRubi</div>
          </div>
          <div className="row save">
            <img src={require(`assets/PNG/save_post.png`)} alt="save" />
            <div>Save Chat</div>
          </div>
          <div className="row close">
            <img src={require(`assets/PNG/close_post.png`)} alt="close" />
            <div>Close Chat</div>
          </div>
          <div className="row delete">
            <img src={require(`assets/PNG/delete_post.png`)} alt="delete" />
            <div>Delete for me</div>
          </div>
          <div className="row delete">
            <img src={require(`assets/PNG/delete_post.png`)} alt="delete" />
            <div>Delete for all</div>
          </div>
          <div className="row report">
            <img src={require(`assets/PNG/report_post.png`)} alt="report" />
            <div>Report Chat</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostModal;
