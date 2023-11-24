import { useState } from "react";
import "./MainUser.css";
import NewPost from "../components/NewPost";
import Header from "../heads/Header";
import HeadButtons from "../heads/HeadButtons";
import FilterModal from "modals/FilterModal/FilterModal";
import { useTranslation } from "react-i18next";
import { USERS_ROLES } from "constants";
import FooterMainUser from "../footer/FooterMainUser";
import Posts from "../components/Posts";
import Sidebar from "modals/UserSidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { POST_STATUS } from "constants";

const MainUser = () => {
  const { userType, getUserType, updateModalsStates, filterModalState } =
    useStore(useDataStore);
  const [userNewPost, setUserNewPost] = useState(false);
  const { t } = useTranslation();
  // const [userFilter, setUserFilter] = useState(POST_STATUS.DEFAULT);
  const handleCloseNewPostModal = () => {
    setUserNewPost(!userNewPost);
  };
  // const handleFilter = (state) => {
  //   handleFilterModal(state);
  //   updateModalsStates("filter","toggle")
  // };
  return (
    <>
      <Sidebar />
      <FilterModal />
      {/* <FilterModal onClick={() => updateModalsStates("filter", "close")} /> */}
      {!userNewPost ? (
        <div className="container-user">
          <div className="header-user">
            <Header />
            {/* <Header onClick={() => updateModalsStates("filter", "close")} /> */}
            {/* <HeadButtons
                userFilter={userFilter}
                setUserFilter={setUserFilter}
              /> */}
          </div>
          <div className="main-user">
            <div
              className="main-user-upper"
              // onClick={() => updateModalsStates("filter", "toggle")}
            >
              {/* <div>My Chats</div> */}
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
              // onClick={() => updateModalsStates("filter", "close")}
            >
              <Posts />
            </div>
          </div>

          <div
            className="footer-user"
            // onClick={() => {
            //   updateModalsStates("filter", "close");
            // }}
          >
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
