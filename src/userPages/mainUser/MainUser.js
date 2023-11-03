import { useState } from "react";
import "./MainUser.css";
import NewPost from "../components/NewPost";
import HeadMenu from "../heads/HeadMenu";
import HeadButtons from "../heads/HeadButtons";
import "../heads/Head.css";
import { USERS_ROLES } from "constants";
import Footer from "../footer/Footer";
import Posts from "../components/Posts";
import Sidebar from "userPages/Sidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { POST_STATUS } from "constants";

const MainUser = () => {
  const { userType, getUserType } = useStore(useDataStore);
  const [userNewPost, setUserNewPost] = useState(false);
  const [convFilter, setConvFilter] = useState(POST_STATUS.DEFAULT);
  const handleCloseNewPostModal = () => {
    setUserNewPost(!userNewPost);
  };
  return (
    <>
      {!userNewPost ? (
        <div className="container">
          <div className="header">
            <div className="mainhead">
              <HeadMenu />
              <HeadButtons
                convFilter={convFilter}
                setConvFilter={setConvFilter}
              />
            </div>
          </div>
          <div className="main">
            <Sidebar />
            <section className="section">
              {(userType === USERS_ROLES.USER ||
                getUserType() === USERS_ROLES.USER) && (
                <Posts convFilter={convFilter} />
              )}
            </section>
          </div>

          <div className="footer">
            <Footer handleCloseNewPostModal={handleCloseNewPostModal} />
          </div>
        </div>
      ) : (
        <NewPost handleCloseNewPostModal={handleCloseNewPostModal} />
      )}
    </>
  );
};

export default MainUser;
