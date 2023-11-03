import { Navbar } from "components";
import {  BsX } from "react-icons/bs";
import { useState } from "react";
import Topics from "./Topics";
import "./GenieTopics.css";

const GenieTopics = () => {

  const [nickname, setNickname] = useState(
    localStorage.getItem("genie-nickname") || ""
  );
  const [search, setSearch] = useState("");

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    localStorage.setItem("genie-nickname", event.target.value);
  };

  const handleClearNickname = () => {
    setNickname("");
    localStorage.removeItem("genie-nickname");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClear = () => {
    alert("clear");
    setSearch("");
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="upper-message">
          <div className="upper-header">
            GenieTopics Here you can search or select up to 5 topics that you
            can help with
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="search"
              value={search}
              onChange={handleSearchChange}
            />
            {search && (
              <button className="clear-button" onClick={handleSearchClear}>
                <BsX />
              </button>
            )}
          </div>
        </div>
        <div className="topics-wrapper">
          {"Here you can change Nickname"}
          <div className="nickname-input-wrapper">
            <input
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={handleNicknameChange}
            />
            {nickname && (
              <button className="clear-button" onClick={handleClearNickname}>
                <BsX />
              </button>
            )}
          </div>
          <Topics search={search} />
        </div>
      </div>
    </>
  );
};

export default GenieTopics;
