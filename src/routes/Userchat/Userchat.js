// import React from "react";
// import { Navbar } from "components";
// import { Carousel } from "components";
// import { Chat } from "components";
// import "./Userchat.css";

// import { useStore } from "zustand";
// import useDataStore from "stores/appStore";
// import { useParams } from "react-router-dom";

// //http://localhost:3000/userchat/1
// const Userchat = () => {
//   const { id } = useParams();
//   // console.log("id", id);
//   const { isNewChat } = useStore(useDataStore);
//   const text = {
//     newChatTop:
//       "GenieBudy's safe space for anonymous sharing of struggles. Our compassionate volunteers offer guidance and support to help you on your journey to healing and growth.",
//     newChatBottom: "( 230 volunteers available. Choose your topic)",
//     oldChat: "GenieBudy's safe space for anonymous sharing of struggles.",
//     chatInfo: "Here is your chat from 20-07-2023 with GOGO ",
//   };

//   return (
//     <>
//       <div className="user-container">
//         <Navbar />

//         <div className="top-message">
//           <div className="top-message-up">{isNewChat && text.newChatTop}</div>

//           <div className="top-message-bottom">{!isNewChat && text.oldChat}</div>
//           <div className="top-message-bottom">
//             {!isNewChat && text.chatInfo}
//           </div>
//         </div>
//         {isNewChat && <Carousel />}
//         <div>
//           <Chat />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Userchat;
