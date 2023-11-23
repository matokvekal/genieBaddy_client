import {useState} from "react";
import "./ActionModal.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const ActionModal = () => {
  const { actionModalState } = useStore(useDataStore);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);


  
  // ... other handlers
  
  const handleGiveRubi = () => {
    console.log("Giving Rubi");
  };

  const handleSaveChat = () => {
    console.log("Saving Chat");
  };

  const handleCloseChat = () => {
    console.log("Closing Chat");
  };



  const handleDeleteForAll = () => {
    console.log("Delete for all");
  };

  const handleDeleteForMe = () => {
    setShowConfirmModal(true);
    setConfirmAction(() => () => {
      console.log("Delete for me confirmed");
      setShowConfirmModal(false);
    });
  };
  
  const handleReportChat = () => {
    setShowConfirmModal(true);
    setConfirmAction(() => () => {
      console.log("Report Chat confirmed");
      setShowConfirmModal(false);
    });
  };

  const actions = [
    {
      imgSrc: "rubi-red.png",
      alt: "give a Rubi",
      label: "Give a Rubi",
      onClick: handleGiveRubi,
      disabled: false,
    },
    {
      imgSrc: "save_post.png",
      alt: "save",
      label: "Save Chat",
      onClick: handleSaveChat,
      disabled: false,
    },
    {
      imgSrc: "close_post.png",
      alt: "close",
      label: "Close Chat",
      onClick: handleCloseChat,
      disabled: false,
    },
    {
      imgSrc: "delete_post.png",
      alt: "delete",
      label: "Delete for me",
      onClick: handleDeleteForMe,
      disabled: false,
    },
    {
      imgSrc: "delete_post.png",
      alt: "delete",
      label: "Delete for all",
      onClick: handleDeleteForAll,
      disabled: false,
    },
    {
      imgSrc: "report_post.png",
      alt: "report",
      label: "Report Chat",
      onClick: handleReportChat,
      disabled: false,
    },
  ];
  //conditions for the actions
  // if (userType === "genie" && postStatus === "closed") {
  //   actions = actions.filter(action =>
  //     action.label === "Give a Rubi" || action.label === "Close Chat");
  // }
  // if (userType === "user" && messageCount === 2) {
  //   actions.forEach(action => {
  //     if (action.label !== "Report Chat") {
  //       action.disabled = true;
  //     }
  //   });
  // }

  return (
    <>
      <div className={`post-modal ${actionModalState ? "open" : ""}`}>
        <div className="post-modal-container">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`row ${action.disabled ? "disabled" : ""}`}
              onClick={!action.disabled ? action.onClick : null}
            >
              <img
                src={require(`assets/PNG/${action.imgSrc}`)}
                alt={action.alt}
              />
              <div>{action.label}</div>
            </div>
            
          ))}
        </div>
        {showConfirmModal && (
      <div className="confirmation-modal">
        <p>Are you sure you want to perform this action?</p>
        <button onClick={confirmAction}>Yes</button>
        <button onClick={() => setShowConfirmModal(false)}>No</button>
      </div>
    )}
      </div>
    </>
  );
};

export default ActionModal;
