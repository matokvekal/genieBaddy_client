import React, { useEffect, useState } from "react";
import "./FooterMainUser.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import moment from "moment";
import { userLimits } from "config/config.js";
import Button1 from "components/Button1/Button1";

function FooterMainUser({ handleCloseNewPostModal }) {
  const { updateUserLimits, toggleSideBar } = useStore(useDataStore);
  const [totalPosts, setTotalPosts] = useState(3);
  const [leftPosts, setLeftPosts] = useState(0);
  const handleNewPost = () => {
    toggleSideBar(false);
    handleCloseNewPostModal();
    // console.log("new post");
  };

  useEffect(() => {
    async function fetchLimits() {
      const localLimits = JSON.parse(localStorage.getItem("user_limits"));
      const localLimitsDate = moment(
        JSON.parse(localStorage.getItem("user_limits_date"))
      );

      if (
        localLimits &&
        localLimitsDate &&
        moment().diff(localLimitsDate, "hours") < userLimits.user_limits_hours
      ) {
        const total = Number(localLimits.USER_POSTS_PER_DAY);
        const left = Number(localLimits.USER_POSTS_LEFT);
        setLeftPosts(left);
        setTotalPosts(total);
      } else {
        const updatedLimits = await updateUserLimits();
        if (updatedLimits?.status !== "error") {
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
        <Button1 
          className="footer"
          disabled={!leftPosts || Number(leftPosts) === 0}
          onClick={handleNewPost}
          text="New Chat"
          icon="+"
        ></Button1>
        {/* <button
          className="button-footer-newchat"
          onClick={handleNewPost}
          disabled={!leftPosts || Number(leftPosts) === 0}
        >
          <div className="button-footer-text">New Chat</div>
          <div className="button-footer-plus">+</div>
        </button> */}

        <div className="footer-lamps">
          {totalPosts &&
            [...Array(totalPosts)].map((_, index) => (
              <img
                key={index}
                src={
                  index < leftPosts
                    ? require(`assets/PNG/lampActive.png`)
                    : require(`assets/PNG/lampDisabled.png`)
                }
                alt="lamp"
                className="footer-icon"
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default FooterMainUser;
