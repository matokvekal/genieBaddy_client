import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

function Footer({ handleCloseNewPostModal }) {
  const {  updateUserLimits } = useStore(useDataStore);
  const [totalPosts, setTotalPosts] = useState(3);
  const [leftPosts, setLeftPosts] = useState(0);
  const handleNewPost = () => {
    handleCloseNewPostModal();
    console.log("new post");
  };


  useEffect(() => {
    async function fetchLimits() {
      const localLimits = JSON.parse(localStorage.getItem("user_limits"));
      if (localLimits) {
        const total = Number(localLimits.USER_POSTS_PER_DAY);
        const left = Number(localLimits.USER_POSTS_LEFT);
        setLeftPosts(left);
        setTotalPosts(total);
      } else {
        const updatedLimits = await updateUserLimits();
        if(updatedLimits?.status!=="error"){
        const total = Number(updatedLimits.USER_POSTS_PER_DAY);
        const left = Number(updatedLimits.USER_POSTS_LEFT);
        setLeftPosts(left);
        setTotalPosts(total);
        }
      }
    }

    fetchLimits();
  }, [updateUserLimits]);

  return (
    <>
      <div className="footer-area">
        <div className="footer-left">
          {totalPosts && [...Array(totalPosts)].map((_, index) => (
            <img
              key={index}
              src={require(`assets/PNG/lamp_icon.gif`)}
              alt="jenie"
              className={`footer-icon ${index < leftPosts ? "" : "used"}`}
            />
          ))}
        </div>
        {leftPosts && Number(leftPosts) > 0 ? (
          <button className="footer-main" onClick={handleNewPost}>
            new
          </button>
        ) : (
          <div className="no-post">Post limit reached. Try again tomorrow!</div>
        )}
        <div className="footer-right"></div>
      </div>
    </>
  );
}

export default Footer;
