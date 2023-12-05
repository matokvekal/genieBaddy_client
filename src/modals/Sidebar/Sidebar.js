import { useState, useEffect } from "react";
import { FaTimes, FaPencilAlt } from "react-icons/fa";

import { useStore } from "zustand";
import useDataStore from "stores/appStore";

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
const Sidebar = () => {
  const { modals, updateModalsStates, logOut, updateUserName, getUsername } =
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
    updateModalsStates("sidebar","close")
  };
  const handleLogOut = () => {
    // console.log("logout");
    // updateModalsStates("sidebar","close")
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


  return (
    <div className={`sidebar ${modals.sidebar ? "open" : ""}`}>
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
              src={require(`assets/PNG/avatars/avatar${selectedAvatar}.png`)}
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
