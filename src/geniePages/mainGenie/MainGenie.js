import { useState } from "react";
import HeadMenu from "../heads/HeadMenu";
import HeadButtons from "../heads/HeadButtons";
import GenieNewPost from "../components/GenieNewPost";
import GenieRating from "../components/GenieRating";
import { USERS_ROLES } from "constants";
import Posts from "../components/Posts";
import Sidebar from "../Sidebar/Sidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { POST_STATUS } from "constants/jeneral";

const COMPONENT_MAP = {
  [POST_STATUS.NEW]: GenieNewPost,
  [POST_STATUS.RATING]: GenieRating,
  default: Posts,
};

const MainGenie = () => {
  const { userType, getUserType } = useStore(useDataStore);
  const [userFilter, setUserFilter] = useState(POST_STATUS.DEFAULTGENIE);
  const [newPostCounter, setNewPostCounter] = useState(0);

  const renderContent = () => {
    if (userType !== USERS_ROLES.GENIE && getUserType() !== USERS_ROLES.GENIE) {
      return null;
    }

    const Component = COMPONENT_MAP[userFilter] || COMPONENT_MAP.default;
    return <Component userFilter={userFilter} setUserFilter={setUserFilter} />;
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="mainhead">
            <HeadMenu />
            <HeadButtons
              userFilter={userFilter}
              setUserFilter={setUserFilter}
              newPostCounter={newPostCounter}
              setNewPostCounter={setNewPostCounter}
            />
          </div>
        </div>
        <div className="main">
          <Sidebar />
          <section className="section">{renderContent()}</section>
        </div>

        <div className="footer">
          {/* <FooterMain handleCloseNewPostModal={handleCloseNewPostModal} /> */}
        </div>
      </div>
    </>
  );
};

export default MainGenie;
