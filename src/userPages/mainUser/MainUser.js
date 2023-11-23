import { useState } from "react";
import "./MainUser.css";
import NewPost from "../components/NewPost";
import Header from "../heads/Header";
import HeadButtons from "../heads/HeadButtons";
import FilterModal from "components/FilterModal/FilterModal";
// import "../heads/Head.css";
import { USERS_ROLES } from "constants";
import FooterMainUser from "../footer/FooterMainUser";
import Posts from "../components/Posts";
import Sidebar from "userPages/Sidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { POST_STATUS } from "constants";

const MainUser = () => {
  const { userType, getUserType, handleFilterModal, filterModalState } =
    useStore(useDataStore);
  const [userNewPost, setUserNewPost] = useState(false);
  const [convFilter, setConvFilter] = useState(POST_STATUS.DEFAULT);
  const handleCloseNewPostModal = () => {
    setUserNewPost(!userNewPost);
  };
  const handleFilter = (state) => {
    handleFilterModal(state);
  };
  return (
    <>
      <Sidebar />
      <FilterModal onClick={handleFilter}/>
      {!userNewPost ? (
        <div className="container-user">
          <div className="header-user">
            <Header onClick={handleFilter}/>
            {/* <HeadButtons
                convFilter={convFilter}
                setConvFilter={setConvFilter}
              /> */}
          </div>
          <div className="main-user">
            <div className="main-user-upper" onClick={(()=>{handleFilter(!filterModalState)})}>
              <div>My Chats</div>
              <img
                src={require(`assets/PNG/mynaui_filter.png`)}
                alt="mynaui_filter"
              />
            </div>
            <div className="main-user-posts"onClick={()=>{handleFilter(false)}}>
              <Posts convFilter={convFilter} />
            </div>
          </div>

          <div className="footer-user"onClick={()=>{handleFilter(false)}}>
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

// handleFilterModal: (data) => {
//   set((state) => ({
//     ...state,
//     actionModalState: data,
//   }));
// },
