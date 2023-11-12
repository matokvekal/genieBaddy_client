import React, { useEffect, useState } from "react";
import "./Footer.css";
// import { useStore } from "zustand";
// import useDataStore from "stores/appStore";

function FooterMain({ handleCloseNewPostModal }) {


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
