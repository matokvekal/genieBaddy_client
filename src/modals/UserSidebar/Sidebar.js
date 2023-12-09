import { useState, useEffect } from "react";
import "./Sidebar.css";
import Button1 from "components/Button1/Button1";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { PATHS_NAMES } from "constants";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {
    modals,
    updateModalsStates,
    logOut,
    getUserNickName,
    updateUserNickName,
    getGenieNickName,
    updateGenieNickName,
    getUserType,
  } = useStore(useDataStore);
  const navigate = useNavigate();
  const userType = getUserType();
  const [nickName, setNickName] = useState("");
  useEffect(() => {
    const initialNickName =
      userType === "user" ? getUserNickName() : getGenieNickName();
    setNickName(initialNickName);
  }, [userType]);

  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || 20
  );
  useEffect(() => {
    localStorage.setItem("avatar", selectedAvatar);
  }, [selectedAvatar]);

  const handleNickName = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\p{L}]/gu, "").substring(0, 15);
    setNickName(inputValue);
    userType === "user"
      ? updateUserNickName(inputValue)
      : updateGenieNickName(inputValue);
  };

  const handleLogOut = () => {
    console.log("logout");
    const type = getUserType();

    updateModalsStates("sidebar", "close");
    logOut();
    if (type === "user") {
      window.location.href = PATHS_NAMES.LOGINUSER;
    } else {
      window.location.href = PATHS_NAMES.LOGINGENIE;
    }
  };

  const handleContactUs = () => {
    console.log("contact");
  };
  const saveProfile = () => {
    userType === "genie"
      ? updateGenieNickName(nickName)
      : updateUserNickName(nickName);

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
          {!modals.userseting && (
            <div className="sidebar-edit">
              <img src={require(`assets/PNG/carbon_edit.png`)} alt="avatar" />
            </div>
          )}
        </div>
        <div className="sidebar-container">
          <div className="sidebar-main">
            <div className={`edit-user ${modals.userseting ? "open" : ""}`}>
              <input
                type="text"
                placeholder="Change your nick name"
                onChange={handleNickName}
                value={nickName}
                // onChange={(e) => setNickName(e.target.value)}
              />
              <img
                src={require(`assets/PNG/carbon_edit.png`)}
                alt="avatar"
                className="carbon_edit"
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
              onClick={handleContactUs}
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
      </div>
    </>
  );
};

// const AvatarModal = ({ setSelectedAvatar, closeModal }) => {
//   return (
//     <div className="avatar-modal">
//       {Array.from({ length: 11 }).map((_, index) => (
//         <>
//           <img
//             className="select_avatar"
//             key={index}
//             src={require(`assets/PNG/avatars/avatar${index + 1}.png`)}
//             alt="avatar"
//             onClick={() => {
//               setSelectedAvatar(index + 1);
//               closeModal();
//             }}
//           />
//         </>
//       ))}
//     </div>
//   );
// };

export default Sidebar;
