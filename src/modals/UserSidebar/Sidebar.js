import { useState, useEffect } from "react";
import "./Sidebar.css";
import Button1 from "components/Button1/Button1";
// import { useNavigate } from "react-router-dom";
// import { PATHS_NAMES } from "constants";
// import { USERS_ROLES } from "constants";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const Sidebar = () => {
  const { modals, updateModalsStates, logOut, getNickName, updateNickName } =
    useStore(useDataStore);
  const [nickName, setNickName] = useState(getNickName);
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || 1
  );
  useEffect(() => {
    localStorage.setItem("avatar", selectedAvatar);
  }, [selectedAvatar]);

  const handleLogOut = () => {
    console.log("logout");
    updateModalsStates("sidebar", "close");
    logOut();
  };

  const handleContact = () => {
    console.log("contact");
  };
  const saveProfile = () => {
    updateNickName(nickName);
    updateModalsStates("userseting", "close", "open");
    console.log("saveProfile");
  };

  return (
    <>
      <div className={`sidebar-user ${modals.sidebar ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">Welcome Back!</div>
          <div
            className="sidebar-close"
            onClick={() => {
              updateModalsStates("sidebar", "close");
            }}
          >
            X
          </div>
        </div>

        <div
          className="sidebar-personal"
          onClick={() => {
            updateModalsStates("userseting", "toggle", "open");
          }}
        >
          <div className="sidebar-avatar-container">
            <img
              src={require(`assets/PNG/avatars/avatar${selectedAvatar}.png`)}
              alt="avatar"
              width={40}
            />
          </div>
          <div className="sidebar-user-name">Hello: {nickName}</div>
          <div className="sidebar-edit">
            <img src={require(`assets/PNG/carbon_edit.png`)} alt="avatar" />
          </div>
        </div>

        <div className="sidebar-main">
          <div className={`edit-user ${modals.userseting ? "open" : ""}`}>
            <input
              type="text"
              placeholder="Change your nick name"
              onChange={(e) => setNickName(e.target.value)}
            />

            <div className="avatarList">
              {Array.from({ length: 151 }, (_, index) => (
                <img
                  key={index}
                  src={require(`assets/PNG/avatars/avatar${index + 1}.png`)}
                  className={`avatar ${
                    selectedAvatar === index + 1 ? "selected" : ""
                  }`}
                  alt={`avatar ${index + 1}`}
                  onClick={() => setSelectedAvatar(index + 1)}
                />
              ))}
            </div>
            <Button1
              className="button1-save-profile"
              disabled={false}
              onClick={saveProfile}
              text="Save"
            ></Button1>
          </div>
        </div>

        <div className="sidebar-buttons">
          <Button1
            className="button1-footer"
            disabled={false}
            onClick={handleContact}
            text="Contact Us"
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
          By using this app you accept our
          <strong>Terms and Conditions</strong>
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
