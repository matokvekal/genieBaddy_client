import { useState, useEffect } from "react";
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import "./Sidebar.css";
// import { useNavigate } from "react-router-dom";
// import { PATHS_NAMES } from "constants";
// import { USERS_ROLES } from "constants";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";


const AvatarModal = ({ setSelectedAvatar, closeModal }) => {
  return (
    <div className="avatar-modal">
      {Array.from({ length: 11 }).map((_, index) => (
        <>
          <img className="select_avatar"
          key={index}
          src={require(`assets/PNG/avatar${index + 1}.png`)}
          alt="avatar"
          onClick={() => {
            setSelectedAvatar(index+1);
            closeModal();
          }}
        />
        </>
      ))}
    </div>
  );
};
const Sidebar = () => {
  const {
    sideBarState,
    toggleSideBar,
    logOut,
    updateUserName,
    getUsername,
  } = useStore(useDataStore);
  // const navigate = useNavigate();
  const userName = getUsername();
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || 1
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    localStorage.setItem("avatar", selectedAvatar);
  }, [selectedAvatar]);

  const handleMenu = () => {
    toggleSideBar(false);
  };
  const handleLogOut = () => {
    // console.log("logout");
    toggleSideBar(false);
    logOut();
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleUpdateUserNameAndOpenModal = () => {
    const newUserName = prompt("Enter new username:");
    if (newUserName) {
      updateUserName(newUserName);
    }
    openModal();
  };
  // const handleNavigate = (nav) => {
  //   switch (nav) {
  //     case PATHS_NAMES.USERCHATS:
  //       updateUserType(USERS_ROLES.USER);
  //       navigate(PATHS_NAMES.USERCHATS, { replace: true });
  //       break;
  //     case PATHS_NAMES.GENIECHATS:
  //       updateUserType(USERS_ROLES.GENIE);
  //       navigate(PATHS_NAMES.GENIECHATS, { replace: true });
  //       break;
  //     case PATHS_NAMES.USERNEWCHAT:
  //       updateUserType(USERS_ROLES.USER);
  //       navigate(PATHS_NAMES.USERNEWCHAT, { replace: true });
  //       break;
  //     case PATHS_NAMES.GENIETOPICS:
  //       updateUserType(USERS_ROLES.GENIE);
  //       navigate(PATHS_NAMES.GENIETOPICS, { replace: true });
  //       break;
  //     default:
  //       break;
  //   }
  //   handleMenu();
  // };

  return (
    <div className={`sidebar ${sideBarState ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">GenieBuddy app.</div>
        <div className="sidebar-close" onClick={handleMenu}>
          <FaTimes />
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="avatar-container">
            <img
              src={require(`assets/PNG/avatar${selectedAvatar}.png`)}
              alt="avatar"
              width={40}
            />
          </div>
          <div>Hello {userName}</div>
          <FaPencilAlt onClick={handleUpdateUserNameAndOpenModal} />
        </div>

        <div className="menu">
          <ul className="sidebar-menu">
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Read Terms</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
        {isModalOpen && (
          <AvatarModal
            setSelectedAvatar={setSelectedAvatar}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
