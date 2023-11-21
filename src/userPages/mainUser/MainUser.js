import { useState } from "react";
import "./MainUser.css";
import NewPost from "../components/NewPost";
import Header from "../heads/Header";
import HeadButtons from "../heads/HeadButtons";
// import "../heads/Head.css";
import { USERS_ROLES } from "constants";
import FooterMainUser from "../footer/FooterMainUser";
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

      <Sidebar />
      {!userNewPost ? (
        <div className="container-user">
          <div className="header-user">
            <Header />
            {/* <HeadButtons
                convFilter={convFilter}
                setConvFilter={setConvFilter}
              /> */}
          </div>
          <div className="main-user">
            <div className="main-user-upper">
              <div>My Chats</div>
              <img
                src={require(`assets/PNG/mynaui_filter.png`)}
                alt="mynaui_filter"
              />
            </div>
            <div className="main-user-posts">
              <Posts convFilter={convFilter} />
            </div>
          </div>

          <div className="footer-user">
            <FooterMainUser handleCloseNewPostModal={handleCloseNewPostModal} />
          </div>
        </div>
      ) : (
        <NewPost handleCloseNewPostModal={handleCloseNewPostModal} />
      )}
    </>
  );
};

export default MainUser;
