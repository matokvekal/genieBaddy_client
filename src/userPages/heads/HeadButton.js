// import React from "react";
// import { useStore } from "zustand";
// import useDataStore from "../../stores/appStore";

// const HeadButton = ({ active, name, posts, setUserFilter }) => {
//   const { updateModalsStates } = useStore(useDataStore);
//   const handleCick = (e) => {
//     e.stopPropagation();
//     // updateModalsStates("sidebar","close")

//     setUserFilter();
//   };
//   return (
//     <div
//       className={`chat-button ${active ? "active" : ""}`}
//       onClick={handleCick}
//     >
//       <div className="chat-button-name">{name}</div>
//       <div className={`chat-button-posts ${active ? "active" : ""}`}>
//         {posts}
//       </div>
//     </div>
//   );
// };

// export default HeadButton;
