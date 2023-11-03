import React, { useEffect, useState } from "react";
import "./Footer.css";
// import { useStore } from "zustand";
// import useDataStore from "stores/appStore";

function FooterMain({ handleCloseNewPostModal }) {
  // const {  updateUserLimits } = useStore(useDataStore);
  // const [totalPosts, setTotalPosts] = useState(3);
  // const [leftPosts, setLeftPosts] = useState(0);
  // const handleNewPost = () => {
  //   handleCloseNewPostModal();
  //   console.log("new post");
  // };

  // useEffect(() => {
  //   async function fetchLimits() {
  //     const localLimits = JSON.parse(localStorage.getItem("user_limits"));
  //     if (localLimits) {
  //       const total = Number(localLimits.USER_POSTS_PER_DAY);
  //       const left = Number(localLimits.USER_POSTS_LEFT);
  //       setLeftPosts(left);
  //       setTotalPosts(total);
  //     } else {
  //       const updatedLimits = await updateUserLimits();
  //       const total = Number(updatedLimits.USER_POSTS_PER_DAY);
  //       const left = Number(updatedLimits.USER_POSTS_LEFT);
  //       setLeftPosts(left);
  //       setTotalPosts(total);
  //     }
  //   }

  //   fetchLimits();
  // }, [updateUserLimits]);

  return (
    <>
      <div className="footer-area">
        <div className="footer-left"></div>

        <button className="footer-main">SHUFFEL</button>

        <div className="footer-right"></div>
      </div>
    </>
  );
}

export default FooterMain;
