import { useState } from "react";
import "./MainUser.css";
import NewPost from "../components/NewPost";
import Header from "../heads/Header";
import FilterModalUser from "modals/FilterModal/FilterModalUser";
import { useTranslation } from "react-i18next";
import FooterMainUser from "../footer/FooterMainUser";
import Posts from "../components/Posts";
import Sidebar from "modals/UserSidebar";
import { useStore } from "zustand";
import { POST_STATUS } from "constants/jeneral";
import useDataStore from "stores/appStore";

const MainUser = () => {
  const { updateModalsStates, modals,setUserGenieFilter } = useStore(useDataStore);
  const [userNewPost, setUserNewPost] = useState(false);
  const { t } = useTranslation();
  const handleCloseNewPostModal = () => {
    setUserNewPost(!userNewPost);
  };
  const handleModal = () => {
    updateModalsStates("filter", "close");
   setUserGenieFilter(POST_STATUS.ALL);
  };
  return (
    <>
      <Sidebar />
      {modals?.filter && <FilterModalUser />}
      {!userNewPost ? (
        <div className="container-user">
          <div className="header-user">
            <Header />
          </div>
          <div className="main-user">
            <div className="main-user-upper">
              <div>{t("My Chats")}</div>

              <div
                onClick={() => {
                  updateModalsStates("filter", "toggle");
                }}
              >
                <img
                  src={require(`assets/PNG/mynaui_filter.png`)}
                  alt="mynaui_filter"
                />
              </div>
            </div>
            <div
              className="main-user-posts"
              onClick={() => {
                updateModalsStates("filter", "close");
              }}
            >
              <Posts />
            </div>
          </div>

          <div className="footer-user" onClick={handleModal}>
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
