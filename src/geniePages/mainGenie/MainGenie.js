import { useState } from "react";
import "./MainGenie.css";
import Header from "../heads/Header";
import FilterModal from "modals/FilterModal/FilterModal";
import { useTranslation } from "react-i18next";
import Footer from "../Footer/FooterMainGenie";
import Posts from "../components/Posts";
import Sidebar from "modals/UserSidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import GenieClaimPost from "geniePages/components/GenieClaimPost";
import GenieAchievements from "geniePages/components/GenieAchievements";
import FooterClaimGenie from "geniePages/Footer/FooterClaimGenie";

const MainGenie = () => {
  const { updateModalsStates, geniePages } = useStore(useDataStore);
  const [postIndex, setPostIndex] = useState(0);
  // const [selectedPost, setSelectedPost] = useState({});
  const [newPosts, setNewPosts] = useState([]);
  const { t } = useTranslation();
  return (
    <>
      <Sidebar />
      <FilterModal />
      <div className="container-genie">
        <div className="header-genie">
          <Header />
        </div>
        {geniePages.geniePosts && <div className="main-genie">
         
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
              <div className="main-genie-posts">
                <Posts />
              </div>
            </div>
          
        </div>}
        {geniePages.genieClaimPost && (
          <GenieClaimPost
            postIndex={postIndex}
            posts={newPosts}
            setPosts={setNewPosts}
          />
        )}
        {geniePages.GenieAchievements && <GenieAchievements />}

        <div className="footer-genie">
          {(geniePages.geniePosts || geniePages.GenieAchievements) && <Footer />}
          {geniePages.genieClaimPost && (
            <FooterClaimGenie
              postIndex={postIndex}
              setPostIndex={setPostIndex}
              posts={newPosts}
              setNewPosts={setNewPosts}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MainGenie;
