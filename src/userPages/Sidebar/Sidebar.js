import { useState, useEffect } from "react";
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import "./Sidebar.css";
import Button1 from "components/Button1/Button1";
// import { useNavigate } from "react-router-dom";
// import { PATHS_NAMES } from "constants";
// import { USERS_ROLES } from "constants";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const Sidebar = () => {
  const { sideBarState, toggleSideBar, logOut, updateUserName, getUsername } =
    useStore(useDataStore);
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
    console.log("handleMenu");
    toggleSideBar(false);
  };
  const handleLogOut = () => {
    console.log("logout");
    toggleSideBar(false);
    logOut();
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleContact = () => {
    console.log("contact");
  };
  const handleUpdateUserNameAndOpenModal = () => {
    const newUserName = prompt("Enter new username:");
    if (newUserName) {
      updateUserName(newUserName);
    }
    openModal();
  };

  return (
    <>
      <div className={`sidebar-user ${sideBarState ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">Welcome Back!</div>
          <div className="sidebar-close" onClick={handleMenu}>
            X
          </div>
        </div>

        <div className="sidebar-personal">
          <div className="sidebar-avatar-container">
            <img
              src={require(`assets/PNG/avatars/avatar${selectedAvatar}.png`)}
              alt="avatar"
              width={40}
            />
          </div>
          <div className="sidebar-user-name">Hello {userName}</div>
          <div className="sidebar-edit">
            <img
              src={require(`assets/PNG/carbon_edit.png`)}
              alt="avatar"
              // width={40}
            />
          </div>
        </div>
        <div className="sidebar-main"></div>
        <div className="sidebar-buttons">
          <Button1
            className="button1-footer"
            disabled={false}
            onClick={handleContact}
            text="New Chat"
            icon={<img src={require(`assets/PNG/email.png`)} alt="avatar" />}
          ></Button1>
          <Button1
            className="button1-footer"
            disabled={false}
            onClick={handleLogOut}
            text="Logout"
            icon={
              <img src={require(`assets/PNG/arrow-right.png`)} alt="avatar" />
            }
          ></Button1>
        </div>
        <div className="sidebar-footer">
          By using this app you accept our <a href>Terms and Conditions</a>
        </div>
      </div>
    </>
    // <div className={`sidebar ${sideBarState ? "open" : ""}`}>
    //   <div className="sidebar-header">
    //     <div className="sidebar-title">GenieBuddy app.</div>
    //     <div className="sidebar-close" onClick={handleMenu}>
    //       <FaTimes />
    //     </div>
    //   </div>
    //   <div className="sidebar-content">
    //     <div className="sidebar-section">
    //       <div className="avatar-container">
    //         <img
    //           src={require(`assets/PNG/avatars/avatar${selectedAvatar}.png`)}
    //           alt="avatar"
    //           width={40}
    //         />
    //       </div>
    //       <div>Hello {userName}</div>
    //       <FaPencilAlt onClick={handleUpdateUserNameAndOpenModal} />
    //     </div>

    //     <div className="menu">
    //       <ul className="sidebar-menu">
    //         <li>
    //           <a href="#">Contact</a>
    //         </li>
    //         <li>
    //           <a href="#">Read Terms</a>
    //         </li>
    //         <li>
    //           <a onClick={handleLogOut}>Logout</a>
    //         </li>
    //       </ul>
    //     </div>
    //     {isModalOpen && (
    //       <AvatarModal
    //         setSelectedAvatar={setSelectedAvatar}
    //         closeModal={closeModal}
    //       />
    //     )}
    //   </div>
    // </div>
  );
};

const AvatarModal = ({ setSelectedAvatar, closeModal }) => {
  return (
    <div className="avatar-modal">
      {Array.from({ length: 11 }).map((_, index) => (
        <>
          <img
            className="select_avatar"
            key={index}
            src={require(`assets/PNG/avatars/avatar${index + 1}.png`)}
            alt="avatar"
            onClick={() => {
              setSelectedAvatar(index + 1);
              closeModal();
            }}
          />
        </>
      ))}
    </div>
  );
};
export default Sidebar;
