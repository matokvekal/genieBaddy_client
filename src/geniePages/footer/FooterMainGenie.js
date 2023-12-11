import React, { useEffect, useState } from "react";
import "./FooterMainGenie.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

function FooterMainGenie() {
  const { updateGeniePagesStates } = useStore(useDataStore);

  const handleFooterMenu = (item) => {
    console.log("item", item);
    updateGeniePagesStates(item, "open");
  };

  return (
    <>
      <div className="footer-area genie">
        <div className="box footer-left">
          <div onClick={() => handleFooterMenu("geniePosts")}>
            <img
              src={require(`assets/PNG/genie_chats.png`)}
              className="genie-chats"
              alt="genie_chats"
            />
          </div>
          <div>chats</div>
        </div>

        <div className="footer-line">|</div>
        <div
          className="box footer-center"
          onClick={() => handleFooterMenu("genieClaimPost")}
        >
          <img
            src={require(`assets/PNG/genie_new2.png`)}
            className="genie_new2"
            alt="genie_new"
          />
          <div>new</div>
        </div>

        <div className="footer-line">|</div>
        <div className="box footer-right">
          <div onClick={() => handleFooterMenu("GenieAchievements")}>
            <img
              src={require(`assets/PNG/genie_stats2.png`)}
              className="genie_stats"
              alt="genie_stats"
            />
          </div>
          <div>Me</div>
        </div>
      </div>
    </>
  );
}

export default FooterMainGenie;
