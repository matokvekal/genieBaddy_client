import { useState } from "react";
import "./MainGenie.css";
import Header from "../heads/Header";
import FilterModalGenie from "modals/FilterModal/FilterModalGenie";
import { useTranslation } from "react-i18next";
import Footer from "../footer/FooterMainGenie";
import FooterAchiev from "../footer/FooterMainGenieAchiev";
import Posts from "../components/Posts";
import Sidebar from "modals/UserSidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { POST_STATUS } from "constants/jeneral";
// import GenieClaimPost from "geniePages/components/GenieClaimPost";
import GenieAchievements from "geniePages/components/GenieAchievements";
import FooterClaimGenie from "geniePages/footer/FooterClaimGenie";
import ClaimPost2 from "../../modals/ClaimPost2/ClaimPost2";

const MainGenie = () => {
  const { updateModalsStates, geniePages, modals, setUserGenieFilter } =
    useStore(useDataStore);
  const [postIndex, setPostIndex] = useState(0);
  const [newPosts, setNewPosts] = useState([]);
  const { t } = useTranslation();
  const handleModal = () => {
    updateModalsStates("filter", "close");
    setUserGenieFilter(POST_STATUS.ALL);
  };
  return (
    <>
      <Sidebar />
      {modals?.filter && <FilterModalGenie />}
      <div className="container-genie">
        <div className="header-genie">
          <Header />
        </div>
        {(geniePages.geniePosts || geniePages.genieClaimPost) && (
          <div className="main-genie">
            <div className="main-genie-new-post">
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
              <div
                className="main-genie-posts"
                onClick={() => {
                  updateModalsStates("filter", "close");
                }}
              >
                <Posts />
              </div>
            </div>
          </div>
        )}
        {geniePages.genieClaimPost && (
            <div className={`claim-post-overlay ${geniePages.genieClaimPost ? 'claim-post-animate' : ''}`}>
            <ClaimPost2
              postIndex={postIndex}
              setPostIndex={setPostIndex}
              newPosts={newPosts}
              setNewPosts={setNewPosts}
            />
          </div>
        )}
        {geniePages.GenieAchievements && <GenieAchievements />}
        <div className="footer-genie" onClick={handleModal}>
          {geniePages.geniePosts && <Footer />}
          {geniePages.GenieAchievements && <FooterAchiev />}
          {geniePages.genieClaimPost && (
            <FooterClaimGenie
              postIndex={postIndex}
              setPostIndex={setPostIndex}
              newPosts={newPosts}
              setNewPosts={setNewPosts}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MainGenie;
