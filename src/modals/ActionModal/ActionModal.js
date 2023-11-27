import { useState } from "react";
import "./ActionModal.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { userUpdateAction } from "services/UserData";
import {USER_ACTIONS} from "constants/jeneral";

const ActionModal = ({ post }) => {
  const { modals, getUserType,updateModalsStates,getUserPostById } = useStore(useDataStore);
  const userType = getUserType();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleAction = async (action, comment = null) => {
    
    let data = {
      post_id: post.id,
      action: action,
      comment: comment,
    };
    try {
     let res=  await userUpdateAction(data);
     res = await getUserPostById(post.id);//call function to change the ls and the state
     //////////

      updateModalsStates("action", "close");
    } catch (error) {
      // Error handling
    }
  };



  const confirmAction = () => {
    handleAction(showConfirmModal);
    setShowConfirmModal(false);
  };

  const isPostClosed = post?.post_status === "closed";
  const isRatingFive = post?.rating === 5;

  return (
    <>
      <div className={`action-modal ${modals.action ? "open" : ""}`}>
        <div className="action-modal-container">
          {!isPostClosed && !isRatingFive && (
            <div className="row" onClick={()=>handleAction(USER_ACTIONS.GIVE_RUBI)}>
              <img src={require(`assets/PNG/rubi-red.png`)} alt="give a Rubi" />
              <div>Give a Rubi</div>
            </div>
          )}
          {/* Other buttons with similar conditional rendering */}
          {!isPostClosed && (
            <div className="row" onClick={()=>handleAction(USER_ACTIONS.CLOSED)}>
              <img src={require(`assets/PNG/close_post.png`)} alt="close" />
              <div>Close Chat</div>
            </div>
          )}
          {userType === "user" && !isPostClosed && (
            <div className="row" onClick={()=>handleAction(USER_ACTIONS.DELETE_FOR_ME)}>
              <img src={require(`assets/PNG/delete_post.png`)} alt="delete" />
              <div>Delete for me</div>
            </div>
          )}
          {userType === "user" && !isPostClosed && (
            <div className="row" onClick={()=>handleAction(USER_ACTIONS.DELETE_FOR_ALL)}>
              <img src={require(`assets/PNG/delete_post.png`)} alt="delete" />
              <div>Delete for all</div>
            </div>
          )}
          {/* ... other buttons ... */}
          {!isRatingFive && (
            <div className="row" onClick={()=>handleAction(USER_ACTIONS.REPORT_CHAT)}>
              <img src={require(`assets/PNG/report_post.png`)} alt="report" />
              <div>Report Chat</div>
            </div>
          )}
        </div>
        {/* Confirmation Modal */}
      </div>
    </>
  );
};

export default ActionModal;

// import { useState } from "react";
// import "./ActionModal.css";
// import { useStore } from "zustand";
// import useDataStore from "stores/appStore";
// import { userUpdateAction } from "services/UserData";
// import {USER_ACTIONS} from "constants/jeneral";

// const ActionModal = ({ post }) => {
//   const { modals } = useStore(useDataStore);
//   const { getUserType } = useStore(useDataStore);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const[userAction, setUserAction] = useState(null);
//   const[comment, setComment] = useState(null);

//   const userType = getUserType();
//   const handleAction = async () => {
//     let data = {
//       post_id: post.id,
//       action: userAction,
//       comment: comment,
//     };
//     try {
//        await userUpdateAction(data);
//     } catch (error) {
//       // console.log("Error updating topic:", error);
//     }
//   };

//   const handleClick=()=>{
//     ()=>{setUserAction(action.name)}
//     // if(userAction === USER_ACTIONS.DELETE_FOR_ME || userAction === USER_ACTIONS.REPORT_CHAT){
//     //   setShowConfirmModal(true);
//     //   setConfirmAction(() => () => {
//     //     console.log("Delete for me confirmed");
//     //     setShowConfirmModal(false);
//       };

//   const handleGiveRubi = () => {
//     console.log("Giving Rubi");
//   };

//   const handleSaveChat = () => {
//     console.log("Saving Chat");
//   };

//   const handleCloseChat = () => {
//     console.log("Closing Chat");
//   };

//   const handleDeleteForAll = () => {
//     console.log("Delete for all");
//   };

//   const handleDeleteForMe = () => {
//     setShowConfirmModal(true);
//     setConfirmAction(() => () => {
//       console.log("Delete for me confirmed");
//       setShowConfirmModal(false);
//     });
//   };

//   const handleReportChat = () => {
//     setShowConfirmModal(true);
//     setConfirmAction(() => () => {
//       console.log("Report Chat confirmed");
//       setShowConfirmModal(false);
//     });
//   };

//   let actions = [
//     {
//       id: 1,
//       name: USER_ACTIONS.GIVE_RUBI,
//       imgSrc: "rubi-red.png",
//       alt: "give a Rubi",
//       label: "Give a Rubi",
//       onClick: handleGiveRubi,
//       disabled: false,
//     },
//     {
//       id: 2,
//       name: USER_ACTIONS.SAVE,
//       imgSrc: "save_post.png",
//       alt: "save",
//       label: "Save Chat",
//       onClick: handleSaveChat,
//       // disabled: false,
//     },
//     {
//       id: 3,
//       name: USER_ACTIONS.CLOSED,
//       imgSrc: "close_post.png",
//       alt: "close",
//       label: "Close Chat",
//       onClick: handleCloseChat,
//       // disabled: false,
//     },
//     {
//       id: 4,
//       name: USER_ACTIONS.DELETE_FOR_ME,
//       imgSrc: "delete_post.png",
//       alt: "delete",
//       label: "Delete for me",
//       onClick: handleDeleteForMe,
//       // disabled: false,
//     },
//     {
//       id: 5,
//       name: USER_ACTIONS.DELETE_FOR_ALL,
//       imgSrc: "delete_post.png",
//       alt: "delete",
//       label: "Delete for all",
//       onClick: handleDeleteForAll,
//       // disabled: false,
//     },
//     {
//       id: 6,
//       name: USER_ACTIONS.REPORT_CHAT,
//       imgSrc: "report_post.png",
//       alt: "report",
//       label: "Report Chat",
//       onClick: handleReportChat,
//       // disabled: false,
//     },
//   ];
//   // conditions for the actions
//   if (userType === "user" && post?.post_status === "closed") {
//     actions = actions.filter(
//       (action) => action.id !== 7 && action.id !== 5 && action.id !== 6
//     );
//   }

//   if (
//     userType === "user" &&
//     (post?.rating === 5 || post?.post_status === "new")
//   ) {
//     actions = actions.filter((action) => action.id !== 1 && action.id !== 6);
//   }

//   if (userType === "user" && post?.rating === 5) {
//     actions.forEach((action) => {
//       if (action.label !== "Report Chat") {
//         action.disabled = true;
//       }
//     });
//   }

//   return (
//     <>
//       <div className={`action-modal ${modals.action ? "open" : ""}`}>
//         <div className="action-modal-container">
//           {actions.map((action, index) => (
//             <div
//               key={index}
//               // className={`row ${action.disabled ? "disabled" : ""}`}
//               onClick={handleClick}
//             >
//               <img
//                 src={require(`assets/PNG/${action.imgSrc}`)}
//                 alt={action.alt}
//               />
//               <div>{action.label}</div>
//             </div>
//           ))}
//         </div>
//         {showConfirmModal && (
//           <div className="confirmation-modal">
//             <p>Are you sure you want to perform this action?</p>
//             <button onClick={handleAction}>Yes</button>
//             <button onClick={() => setShowConfirmModal(false)}>No</button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ActionModal;
