import { useState, useEffect } from "react";
import "./Sidebar.css";
import Button1 from "components/Button1/Button1";
// import { useNavigate } from "react-router-dom";
// import { PATHS_NAMES } from "constants";
// import { USERS_ROLES } from "constants";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

const Sidebar = () => {
  const { sideBarState, toggleSideBar, logOut, getNickName, updateNickName } =
    useStore(useDataStore);
  // const navigate = useNavigate();
  // const NickName = getNickName();
  const [nickName, setNickName] = useState(getNickName);
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || 1
  );
  const [openModal, setOpenModal] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };
  useEffect(() => {
    localStorage.setItem("avatar", selectedAvatar);
  }, [selectedAvatar]);

  const handleMenu = () => {
    console.log("handleMenu");
    setOpenModal(false);
    toggleSideBar(false);
  };
  const handleLogOut = () => {
    console.log("logout");
    setOpenModal(false);
    toggleSideBar(false);
    logOut();
  };

  const handleContact = () => {
    console.log("contact");
    setOpenModal(false);
  };
  const saveProfile = () => {
    setOpenModal(false);
    updateNickName(nickName);
    console.log("saveProfile");
  };

  const handleEdit = () => {
    console.log("handleEdit");
    setOpenModal(true);
  };
  // const handleUpdateUserNameAndOpenModal = () => {
  //   const newUserName = prompt("Enter new username:");
  //   if (newUserName) {
  //     updateUserName(newUserName);
  //   }
  //   openModal();
  // };

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
          <div className="sidebar-user-name" onClick={handleEdit}>
            Hello: {nickName}
          </div>
          <div className="sidebar-edit">
            <img src={require(`assets/PNG/carbon_edit.png`)} alt="avatar" />
          </div>
        </div>

        {openModal && (
          <div className="sidebar-main">
            <div className="edit-user">
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
        )}

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
