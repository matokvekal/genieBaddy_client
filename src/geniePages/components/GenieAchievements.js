import React, { useState } from "react";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import GenieAchievRow from "./GenieAchievRow";
import "./GenieAchievements.css";

const GenieAchievements = () => {
  const [rows, setRows] = useState([
    {
      header: "Days",
      text: "Spent out of your time",
      image: "calander1",
      number: 250,
    },
    {
      header: "Posts",
      text: "Contribute to society",
      image: "posts",
      number: 100,
    },
    {
      header: "Peoples",
      text: "You have helped",
      image: "peoples",
      number: 20,
    },
    {
      header: "Rubies",
      text: "Given by users to you",
      image: "rubi2",
      number: 45,
    },
  ]);

  return (
    <>
      <div className="achiev-container">
        <div className="achiev-upper">
          <div className="achiev-upper-text">
            <h1>Achievements</h1>
            <h3>You are on the right track!</h3>
          </div>
          <div className="achiev-upper-image">
            <img
              src={require(`assets/PNG/achievement1.png`)}
              alt="achievement"
            />
          </div>
        </div>
        <div className="achiev-lower">
          <div className="achiev-lower-text">You have earned so far:</div>
          <div className="achiev-lower-rows">
            {rows && rows.map((row, i) => <GenieAchievRow key={i} {...row} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenieAchievements;
