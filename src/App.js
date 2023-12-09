import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
    if (loginStatus) {
      const myUserType = getUserType(); // Get userType here
      const intervalFunction =
        myUserType === USERS_ROLES.GENIE
          ? handleGenieNewChats
          : handleUserNotRead;
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
    // Get userType here

    // if (!myUserType) {
    //   if (pathname.startsWith(PATHS_NAMES.LOGINUSER)) {
    //     myUserType = USERS_ROLES.USER;
    //   } else if (pathname.startsWith(PATHS_NAMES.LOGINGENIE)) {
    //     myUserType = USERS_ROLES.GENIE;
    //   }
    // }

    if (isLogin) {
      setLoginStatus(true);
      let myUserType = getUserType();
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

  const getHomeComponent = () => {
    // const myUserType = getUserType() || localStorage.getItem("userType"); // Get userType here
    if (localStorage.getItem("userType")==="user" ||pathname.startsWith("/loginuser")) {
      return <MainUser />;
    } else if (localStorage.getItem("userType")==="genie"||pathname.startsWith("/logingenie")) {
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
          <Route exact path={"/loginuser"} element={<LoginUser />} />
          <Route exact path={"/logingenie"} element={<LoginGenie />} />
          <Route exact path={"/user"} element={<MainUser />} />
          <Route exact path="/userpostdata" element={<UserPostData />} />
          <Route exact path="/geniepostdata" element={<GeniePostData />} />
          <Route exact path="/userpostdata/:id" element={<UserPostData />} />
          <Route exact path={"/genie"} element={<MainGenie />} />
          <Route path="*" element={<NotFound />} /> {/* This is the new line */}
        </Routes>
      </CookiesProvider>
      <ToastContainer theme="colored" />
    </>
  );
}
export default App;
