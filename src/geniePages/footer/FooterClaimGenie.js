import React, { useEffect, useState } from "react";
import "./FooterClaimGenie.css";
import ButtonClaim from "components/ButtonClaim/ButtonClaim";
import { genieClaimPost } from "services/getData";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { toast, ToastContainer } from "react-toastify";

function FooterClaimGenie({ postIndex, setPostIndex, newPosts, setNewPosts }) {
  const {
    updateGeniePagesStates,
    updateGenieNewPostCounter,
    genieNewPostsCounter,
    cleanGeniePosts,
    triggerToast,
    getGenieNickName,
  } = useStore(useDataStore);

  const handleFooterMenu = (item) => {
    console.log("item", item);
    updateGeniePagesStates(item, "open");
  };
  const handleNext = () => {
    setPostIndex((prev) => (prev + 1) % genieNewPostsCounter);
  };

  const hendlePrev = () => {
    setPostIndex(
      (prev) => (prev - 1 + genieNewPostsCounter) % genieNewPostsCounter
    );
  };

  const HandleClamePost = async () => {
    if(!newPosts[postIndex]) return;
    
    handleFooterMenu("genieClaimPost");
    try {
      updateGenieNewPostCounter(0);
      const avatar = localStorage.getItem("avatar");
      const genieNickname = getGenieNickName();
      const res = await genieClaimPost(
        newPosts[postIndex].id,
        avatar,
        genieNickname
      );

      if (res && res.status === 200 && res.statusText === "OK") {
        await cleanGeniePosts();
        setNewPosts([]);
        updateGeniePagesStates("geniePosts", "open");
      } else {
        if (res) {
          triggerToast(res);
          updateGeniePagesStates("geniePosts", "open");
        } else console.log("error HndleClamePost");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="claim-footer-area-genie">
        <div onClick={handleNext} className="claim-footer-left">
          <img
            src={require(`assets/PNG/left-arrow.png`)}
            className="genie-left-arrow"
            alt="left-arrow"
          />
          <div>Previous</div>
        </div>

        <div onClick={HandleClamePost} className="claim-footer-center">
          <ButtonClaim text="Select chat" />
        </div>

        <div onClick={hendlePrev} className="claim-footer-right">
          <div>Next</div>
          <img
            src={require(`assets/PNG/right-arrow.png`)}
            className="genie-right-arrow"
            alt="right-arrow"
          />
        </div>
      </div>
    </>
  );
}

export default FooterClaimGenie;
