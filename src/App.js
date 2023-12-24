import { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import LoginUser from "./auth/loginUser/LoginUser";
import LoginGenie from "./auth/loginGenie/LoginGenie";
import rolesPaths from "./auth/rolesPaths.json";
import { USERS_ROLES, PATHS_NAMES } from "constants";
import { toast, ToastContainer } from "react-toastify";
import UserPostData from "userPages/components/UserPostData";
import GeniePostData from "geniePages/components/GeniePostData";
import MainGenie from "geniePages/mainGenie/MainGenie";
import "react-toastify/dist/ReactToastify.css";
import MainUser from "userPages/mainUser/MainUser";
import { appInfo } from "config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import "config/i18n";
import NotFound from "404.js";

function App() {
  let {
    loginStatus,
    getUserType,
    setLoginStatus,
    showToast,
    toastMessage,
    resetToast,
    toastType,
    handleUserNotRead,
    setUserType,
    handleGenieNewChats,
  } = useStore(useDataStore);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    let chatCheckInterval;
    if (loginStatus || localStorage.getItem("authenticated") === "true") {
      const myUserType = getUserType() || localStorage.getItem("userType"); // Get userType here
      const intervalFunction = () => {
        if (myUserType === "genie") {
          // if (myUserType === USERS_ROLES.GENIE) {
          handleGenieNewChats();
        } else {
          handleUserNotRead();
        }
      };

      chatCheckInterval = setInterval(() => {
        intervalFunction();
      }, 1000 * 60 * appInfo.checkForNewPostsMinutes);
    }
    return () => {
      if (chatCheckInterval) {
        clearInterval(chatCheckInterval);
      }
    };
  }, [loginStatus, getUserType, handleGenieNewChats, handleUserNotRead]); // Added getUserType to dependency array
  useEffect(() => {
    let isLogin =
      loginStatus || localStorage.getItem("authenticated") === "true";
    if (isLogin) {
      setLoginStatus(true);
      let myUserType = getUserType() || localStorage.getItem("userType"); // Get userType here
      if (myUserType) {
        setUserType(myUserType); // Assuming this is the correct method to update userType in store
        localStorage.setItem("userType", myUserType);
      }
      const pathsForRole = rolesPaths[myUserType];
      const isAllowedPath = pathsForRole?.includes(pathname);
      if (!isAllowedPath && pathsForRole) {
        navigate(pathsForRole[0], { replace: true });
      }
    } else {
      if (pathname.startsWith("/loginuser")) {
        navigate(PATHS_NAMES.LOGINUSER, { replace: true });
      } else if (pathname.startsWith("/logingenie")) {
        navigate(PATHS_NAMES.LOGINGENIE, { replace: true });
      }
    }
  }, [
    loginStatus,
    pathname,
    navigate,
    setUserType,
    getUserType,
    setLoginStatus,
  ]);

  useEffect(() => {
    if (showToast && toastMessage) {
      toastType === "success"
        ? toast.success(toastMessage)
        : toast.error(toastMessage);
      resetToast();
    }
  }, [showToast, toastMessage, resetToast, toastType]);

  const checkUserAccess = (Component, allowedRoles) => {
    debugger
    const isLogin =
      loginStatus || localStorage.getItem("authenticated") === "true";
    if (!isLogin) {
      return <Navigate to="/loginuser" />;
    }
    return <Component />;
  };
  const checkGenieAccess = (Component, allowedRoles) => {
    debugger
    const isLogin =
      loginStatus || localStorage.getItem("authenticated") === "true";
    if (!isLogin) {
      return <Navigate to="/logingenie" />;
    }
    return <Component />;
  };

  const getHomeComponent = () => {
    debugger;
    // const myUserType = getUserType() || localStorage.getItem("userType"); // Get userType here
    if (
      localStorage.getItem("userType") === "user" ||
      pathname.startsWith("/loginuser")
    ) {
      return <MainUser />;
    } else if (
      localStorage.getItem("userType") === "genie" ||
      pathname.startsWith("/logingenie")
    ) {
      return <MainGenie />;
    }
    // return <Redirect to="/login" />; // Replace with your desired behavior
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <CookiesProvider>
        <Routes>
          <Route exact path="/" element={getHomeComponent()} />
          <Route exact path="/loginuser" element={<LoginUser />} />
          <Route exact path="/logingenie" element={<LoginGenie />} />
          <Route
            exact
            path="/user"
            element={checkUserAccess(MainUser, ["user"])}
          />
          <Route
            exact
            path="/userpostdata"
            element={checkUserAccess(UserPostData, ["user"])}
          />
          <Route
            exact
            path="/geniepostdata"
            element={checkGenieAccess(GeniePostData, ["genie"])}
          />
          <Route
            exact
            path="/userpostdata/:id"
            element={checkUserAccess(UserPostData, ["user"])}
          />
          <Route
            exact
            path="/genie"
            element={checkGenieAccess(MainGenie, ["genie"])}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CookiesProvider>

      <ToastContainer theme="colored" />
    </>
  );
}
export default App;
