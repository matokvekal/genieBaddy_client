import { useState } from "react";
import "./ActionModal.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { updateAction } from "services/getData";
import { USER_ACTIONS } from "constants/jeneral";

const ActionModal = ({ post }) => {
  const { modals, getUserType, updateModalsStates, getActionPostById } =
    useStore(useDataStore);
  const userType = getUserType() || localStorage.getItem("userType");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleAction = async (action, comment = null) => {
    let data = {
      post_id: post.id,
      action,
      comment,
    };
    try {
      let res = await updateAction(data);
      if (res.status === 200) {
        res = await getActionPostById(post.id);
      }

      updateModalsStates("action", "close");
    } catch (error) {
      // Error handling
    }
  };

  const confirmAction = () => {
    handleAction(showConfirmModal);
    setShowConfirmModal(false);
  };
  const isPostnew = post?.post_status === "new";
  const isPostClosed = post?.post_status === "closed";
  const isRatingFive = post?.rating === 5;
  return (
    <>
      <div className={`action-modal ${modals.action ? "open" : ""}`}>
        <div className="action-modal-container">
          {userType === "user" && !isRatingFive && isPostClosed && (
            <div
              className="row"
              onClick={() => handleAction(USER_ACTIONS.GIVE_RUBI)}
            >
              <img src={require(`assets/PNG/rubi_red.png`)} alt="give a Rubi" />
              <div>Give a Rubi</div>
            </div>
          )}
          {/* Other buttons with similar conditional rendering */}
          {!isPostClosed && !isPostnew && (
            <div
              className="row"
              onClick={() => handleAction(USER_ACTIONS.CLOSED)}
            >
              <img src={require(`assets/PNG/close_post.png`)} alt="close" />
              <div>Close Chat</div>
            </div>
          )}
          {isPostClosed && (
            <div
              className="row"
              onClick={() => handleAction(USER_ACTIONS.DELETE_FOR_ME)}
            >
              <img src={require(`assets/PNG/delete_post.png`)} alt="delete" />
              <div>Delete Chat</div>
            </div>
          )}
          {userType === "user" && (
            <div
              className="row"
              onClick={() => handleAction(USER_ACTIONS.SAVE)}
            >
              <img src={require(`assets/PNG/save_post.png`)} alt="save" />
              <div>Save Chat</div>
            </div>
          )}
          {/* {userType === "user" && (isPostClosed || isPostnew) && (
            <div
              className="row"
              onClick={() => handleAction(USER_ACTIONS.DELETE_FOR_ALL)}
            >
              <img src={require(`assets/PNG/delete_post.png`)} alt="delete" />
              <div>Delete for all</div>
            </div>
          )} */}
          {/* ... other buttons ... */}
          {/* {!isPostClosed && !isPostnew && (
            <div
              className="row"
              onClick={() => handleAction(USER_ACTIONS.REPORT_CHAT)}
            >
              <img src={require(`assets/PNG/report_post.png`)} alt="report" />
              <div>Report Chat</div>
            </div>
          )} */}
        </div>
        {/* Confirmation Modal */}
      </div>
    </>
  );
};

export default ActionModal;
