import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import LoginUser from "./auth/loginUser/LoginUser";
import LoginGenie from "./auth/loginGenie/LoginGenie";
import rolesPaths from "./auth/rolesPaths.json";
import { USERS_ROLES, PATHS_NAMES } from "constants";
import { toast, ToastContainer } from "react-toastify";
import Landing from "Landing/Landing";
import UserPostData from "userPages/components/UserPostData";
import GeniePostData from "geniePages/components/GeniePostData";
import MainGenie from "geniePages/mainGenie/MainGenie";
import "react-toastify/dist/ReactToastify.css";
import MainUser from "userPages/mainUser/MainUser";
import {appInfo} from "config/config";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

function App() {
  let {
    loginStatus,
    userType,
    setLoginStatus,
    showToast,
    toastMessage,
    resetToast,
    handleUserNewChats,
    handleGenieNewChats,
  } = useStore(useDataStore);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    let chatCheckInterval;
    if (loginStatus) {
      const intervalFunction = userType === USERS_ROLES.GENIE ? handleGenieNewChats : handleUserNewChats;
      chatCheckInterval = setInterval(intervalFunction, 1000 * 60 * appInfo.checkForNewPostsMinutes); // X is your chosen interval in minutes
    }
    return () => {
      if (chatCheckInterval) {
        clearInterval(chatCheckInterval);
      }
    };
  }, [loginStatus, userType, handleUserNewChats, handleGenieNewChats]);
  
  useEffect(() => {
    const localStorageLoginStatus = localStorage.getItem("authenticated");
    const isAuth = localStorageLoginStatus === "true";
    if (!userType) {
      userType = localStorage.getItem("userType");}
    if (!userType) {
      if (pathname.startsWith(PATHS_NAMES.LOGINUSER)) {
        userType = USERS_ROLES.USER;
      } else if (pathname.startsWith(PATHS_NAMES.LOGINGENIE)) {
        userType = USERS_ROLES.GENIE;
      }
    }

    if (!loginStatus && isAuth) {
      setLoginStatus(true);
    }
    if (loginStatus || isAuth) {
      const role = userType.toLowerCase(); // Assuming the userType will match the keys in your JSON file after converting to lowercase
      const pathsForRole = rolesPaths[role]; // Get the allowed paths for the user's role
      const isAllowedPath =
        pathsForRole && pathsForRole.includes(location.pathname);
      if (!isAllowedPath) {
        // If the current path is not allowed for the user role, redirect them to the default path for their role
        const defaultPath = pathsForRole ? pathsForRole[0] : "/";
        navigate(defaultPath, { replace: true });
      }
    } else if (!isAuth) {
      // If not authenticated, navigate based on userType
      const targetPath =
        userType === USERS_ROLES.GENIE
          ? PATHS_NAMES.LOGINGENIE
          : PATHS_NAMES.LOGINUSER;
      navigate(targetPath, { replace: true });
    }
  }, [loginStatus, userType, navigate, setLoginStatus, location.pathname]);

  useEffect(() => {
    if (showToast && toastMessage) {
      toast.error(toastMessage);
      // toast.success(toastMessage);
      resetToast();
    }
  }, [showToast, toastMessage, resetToast]);

  return (
    <>
      {" "}
      {/* <ToastContainer /> */}
      <CookiesProvider>
        <Routes>
          <Route exact path={PATHS_NAMES.EMPTY} element={<Landing />} />
          <Route exact path={PATHS_NAMES.LOGINUSER} element={<LoginUser />} />
          <Route exact path={PATHS_NAMES.LOGINGENIE} element={<LoginGenie />} />
          <Route exact path={PATHS_NAMES.USER} element={<MainUser />} />
          <Route exact path="/userpostdata" element={<UserPostData />} />
          <Route exact path="/geniepostdata" element={<GeniePostData />} />
          <Route exact path={PATHS_NAMES.GENIE} element={<MainGenie />} />
          {/* <Route exact path="/genieNewPost" element={<GenieNewPost />} /> */}
          {/* <Route exact path="/post/:id" element={<GenieChat />} />
          <Route exact path="/genietopics" element={<GenieTopics />} />  */}
        </Routes>
      </CookiesProvider>{" "}
      <ToastContainer theme="colored" />
    </>
  );
}
export default App;
