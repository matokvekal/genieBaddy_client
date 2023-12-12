// import "./HeadGenieNewPost.css";
// import Button2 from "components/Button2/Button2";
// import { useStore } from "zustand";
// import useDataStore from "stores/appStore";
// import { useNavigate } from "react-router-dom";

// function HeadGeniePost({ post }) {
//   const navigate = useNavigate();
//   const { updateModalsStates,updateGeniePagesStates,genieNewPostsCounter} = useStore(useDataStore);

//   function goBack() {
//     updateGeniePagesStates("geniePosts", "open");
//     navigate('/');  
//     // window.history.back();
//   }
//   return (
//     <>
//       <div className="genie-mainhead-userpost">
//         {genieNewPostsCounter>0 && post ? (
//           <ul className="genie-head-items">
//             <li className="genie-head-back-arrow" onClick={goBack}>
//               <img
//                 src={require(`assets/PNG/left-arrow-circle.png`)}
//                 className="genie-arrow-back"
//                 alt="arrow back"
//               />
//             </li>
//             <li className="genie-head-avatar">
//               {post.user_avatar && (
//                 <img
//                   src={require(`assets/PNG/avatars/avatar${post.user_avatar}.png`)}
//                   className="genie-postdata-image"
//                   alt="user avatar"
//                 />
//               )}
//             </li>
//             <li className="genie-head-nick-name">{post.user_nickname}</li>
//             <li className="genie-head-topic">
//               <Button2 text={post?.topic_name} />
//             </li>
//             <li
//               className="genie-head-menu"
//               onClick={() => {
//                 updateModalsStates("action", "toggle");
//               }}
//             >
//               {null && (
//                 <img
//                   src={require(`assets/PNG/3dots.png`)}
//                   className="genie-post-image"
//                   alt="3dots"
//                 />
//               )}
//             </li>
//           </ul>
//         ):
//         <ul className="nopost-genie-head-items">
//         <li className="nopost-genie-head-back-arrow" onClick={goBack}>
//           <img
//             src={require(`assets/PNG/left-arrow-circle.png`)}
//             className="nopost-genie-arrow-back"
//             alt="arrow back"
//           />
//         </li>
//         </ul>
//         }
//       </div>
//     </>
//   );
// }

// export default HeadGeniePost;
