import React, { useEffect, useState } from "react";
import "./FooterClaimGenie.css";
import ButtonClaim from "components/ButtonClaim/ButtonClaim";
import { genieClaimPost } from "services/getData";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { toast, ToastContainer } from "react-toastify";

function FooterClaimGenie({
  postIndex,
  setPostIndex,
  posts,
  setNewPosts,
}) {
  const {
    updateGeniePagesStates,
    updateGenieNewPostCounter,
    genieNewPostsCounter,
    cleanGeniePosts,
    triggerToast,
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

  const HndleClamePost = async () => {
    handleFooterMenu("genieClaimPost");
    try {
      updateGenieNewPostCounter(0)
      const avatar = localStorage.getItem("avatar");
      const res = await genieClaimPost(posts[postIndex].id, avatar);

      if (res && res.status === 200 && res.statusText === "OK") {
        await cleanGeniePosts();
        setNewPosts([]);
        updateGeniePagesStates("geniePosts", "open");
        //clean the post
        
        // console.log(POST_STATUS.OPEN);
        // setUserFilter(POST_STATUS.OPEN);

        // setUserFilter(POST_STATUS.OPEN);
        //refreshData();
        //go to tab open with sort acs
        // fetchData();
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
      {genieNewPostsCounter>0&&<div className="claim-footer-area-genie">
        <div onClick={handleNext} className="claim-footer-left">
          <img
            src={require(`assets/PNG/left-arrow.png`)}
            className="genie-left-arrow"
            alt="left-arrow"
          />
          <div>Previous</div>
        </div>

        <div onClick={HndleClamePost} className="claim-footer-center">
          <ButtonClaim text="Claim chat" />
        </div>

        <div onClick={hendlePrev} className="claim-footer-right">
          <div>Next</div>
          <img
            src={require(`assets/PNG/right-arrow.png`)}
            className="genie-right-arrow"
            alt="right-arrow"
          />
        </div>
      </div>}
    </>
  );
}

export default FooterClaimGenie;
