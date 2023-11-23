import { Logo1 } from "assets";
// import { useModal } from "hooks";
// import { EulaModal } from "components";
import "./navbar.css";
import Sidebar from "modals/UserSidebar";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

// Amplify.configure(awsExports);

const Navbar = () => {
  const { modals } = useStore(useDataStore);

  const handleLogOut = async () => {
    // console.log("logout");
  };

  const handleMenu = () => {
    // handleSideBar(!sideBarState);
  };

  // const handleUserAgreementModalClick = () => {
  // 	openModal({ isApprove: false });
  // }
  // const handleSideBar = () => {
  // 	updateSideBarOpen(true);
  //  };
  //  let config = get().myConfig;
  return (
    <>
      {modals.sidebar && <Sidebar />}
      <div className="navbar">
        <div className="container">
          <div className="hamburger-lines" onClick={handleMenu}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <div className="logo-container ">
            <Logo1 className="logo" />
          </div>
          <div className="menu-items">
            <li>
              <button>הסכם משתמש</button>
            </li>
            <li>
              <button onClick={handleLogOut}>התנתק</button>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
