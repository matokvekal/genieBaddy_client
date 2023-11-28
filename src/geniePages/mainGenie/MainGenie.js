import { useState } from "react";
import "./MainGenie.css";
// import NewPost from "../components/NewPost";
import Header from "../heads/Header";
import FilterModal from "modals/FilterModal/FilterModal";
import { useTranslation } from "react-i18next";
import Footer from "../Footer/Footer";
import Posts from "../components/Posts";
import Sidebar from "modals/UserSidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const MainGenie = () => {
  const { updateModalsStates } = useStore(useDataStore);
  const [userNewPost, setUserNewPost] = useState(false);
  const { t } = useTranslation();
  const handleCloseNewPostModal = () => {
    setUserNewPost(!userNewPost);
  };

  return (
    <>
      <Sidebar />
      <FilterModal />
      <div className="container-genie">
        <div className="header-genie">
          <Header />
        </div>
        <div className="main-genie">
          <div className="main-genie-upper">
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
          <div className="main-genie-posts">
            <Posts />
            </div>
        </div>

        <div className="footer-genie">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainGenie;
