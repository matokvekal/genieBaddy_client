import { createStore } from "zustand";
import Cookies from "js-cookie";
import { Login } from "../services/Auth";
import moment from "moment";
import {
  saveToIndexedDB,
  getAllFromIndexedDB,
  deleteDb,
} from "../services/IndexDb";
import {
  fetchUserPosts,
  fetchGeniePosts,
  getUserLimitsFromServer,
  getTopics,
} from "services/getData";
export const initialState = {
  userId: "",
  userName: "",
  userType: "",
  // userType: "user",
  sideBarState: false,
  isNewChat: true,
  loginStatus: false,
  mode: "development",
  topics: [],
  allPosts: [],
  geniePosts: [],
  genieNewPostsCounter: 0,
  postId: null,
  user_limits: {
    USER_CHATS_PER_POST: null,
    USER_POSTS_PER_DAY: null,
    USER_POSTS_USED: null,
    USER_POSTS_USED_DATE: null,
    USER_POSTS_LEFT: null,
  },
  showToast: false,
  toastMessage: '',
};

//store
const useDataStore = createStore((set, get) => ({
  ...initialState,
  savePostsToState: (posts) => {
    set((state) => ({
      ...state,
      allPosts: posts,
    }));
  },
  saveUserLimitsToState: (limits) => {
    set((state) => ({
      ...state,
      user_limits: limits,
    }));
  },
  saveTopicsToState: (topics) => {
    set((state) => ({
      ...state,
      topics: topics,
    }));
  },
  updateGenieNewPostCounter: (counter) => {
    set((state) => ({
      ...state,
      genieNewPostsCounter: counter,
    }));
  },
  savePostsToIndexDb: (posts) => {
    try {
      saveToIndexedDB(posts);
    } catch (error) {
      console.error("Error saving posts to IndexedDB:", error);
    }
  },
  handleSidebar: (data) => {
    set((state) => ({
      ...state,
      sideBarState: data,
    }));
  },
  setPostId: (id) => {
    set((state) => ({
      ...state,
      postId: id,
    }));
  },
  toggleSideBar: (effect) => {
    set((state) => ({
      ...state,
      sideBarState: effect,
    }));
  },
  updateUserType: (type) => {
    set((state) => ({
      ...state,
      userType: type,
    }));
  },
  getUserType: () => {
    let userType = get().userType || localStorage.getItem("userType");
    return userType;
  },
  updateNewChat: (type) => {
    set((state) => ({
      ...state,
      isNewChat: type,
    }));
  },
  updateUserName: (name) => {
    set((state) => ({
      ...state,
      userName: name,
    }));
    localStorage.setItem("userName", name);
  },
  getUsername: () => {
    const state = get();
    let userName =
      get().userName || localStorage.getItem("userName") || state.userType;
    return userName;
  },
  cleanGeniePosts: () => {
    localStorage.removeItem("geniePosts");
    set((state) => ({
      ...state,
      geniePosts: [],
    }));
  },

  triggerToast: (message) => set(state => ({
    showToast: true,
    toastMessage: message
  })),
  resetToast: () => set({ showToast: false, toastMessage: '' }),
  logOut: () => {
    set((state) => ({
      ...state,
      userName: "",
      userType: "",
      loginStatus: false,
    }));
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_limits");
    localStorage.removeItem("user_limits_date");
    localStorage.removeItem("topics");
    localStorage.removeItem("userName");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("geniePosts");
    deleteDb();
  },
  setLoginStatus: (loginStatus) => {
    set((state) => ({
      ...state,
      loginStatus: loginStatus,
    }));
    localStorage.setItem("authenticated", loginStatus);
  },
  handleLogin: async ({ username, password, userRole }) => {
    try {
      if (!username || !password) {
        return false;
      }
      let AuthParameters = {
        email: username,
        password: password,
        user_role: userRole,
      };
      const response = await Login(AuthParameters);

      if (response.status !== 200) {
        return { info: "notFound", status: response.status };
      }

      const data = await response.json();
      console.log("data at store ", data);
      set((state) => ({
        ...state,
        userName: data.user_name,
        userType: data.user_role,
        loginStatus: true,
      }));
      Cookies.set("IdToken", data.token, {
        expires: 180,
      });
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.user_role);
      deleteDb();
      return { ...data, status: 200 };
    } catch (e) {
      console.error("error in handleLogin", e);
    }
  },
  getUserPosts: async () => {
    try {
      const currentPosts = get().allPosts;
      if (currentPosts?.length) {
        return currentPosts;
      }

      const dbPosts = await getAllFromIndexedDB();
      if (dbPosts?.length) {
        get().savePostsToState(dbPosts); // Save to state
        return dbPosts;
      }

      // Fetch from server
      const data = await fetchUserPosts();
      if (data.length === 0) {
        return { status: "no data" };
      } else {
        get().savePostsToState(data);
        get().savePostsToIndexDb(data);

        return data;
      }
    } catch (err) {
      // console.log("error in getUserPosts", err);
      return { status: "error", info: err.message };
    }
  },
  getGeniePosts: async () => {
    try {
      console.log("start getJeniePosts");
      const currentPosts = get().geniePosts;
      if (currentPosts?.length) {
        return currentPosts;
      }
      //get the genie posts from localstorage
      const posts = localStorage.getItem("geniePosts");
      if (posts) {
        const geniePosts = JSON.parse(posts);
        get().savePostsToState(geniePosts);
        return geniePosts;
      }

      // Fetch from server
      const data = await fetchGeniePosts();
      if (data.length === 0) {
        return { status: "no data" };
      } else {
        get().savePostsToState(data);
        //save genie posta s to localstorage
        localStorage.setItem("geniePosts", JSON.stringify(data));
        // get().savePostsToIndexDb(data);

        return data;
      }
    } catch (err) {
      // console.log("error in getGeniePosts", err);
      return { status: "error", info: err.message };
    }
  },
  refreshUserPosts: async () => {
    try {
      set((state) => ({
        ...state,
        allPosts: [],
      }));

      await deleteDb();
      const result = await fetchUserPosts();
      if (result.status !== 200) {
        throw new Error(`Failed to fetch posts: ${result.status}`);
      }
      const freshPosts = result?.data?.result;
      saveToIndexedDB(freshPosts);

      set((state) => ({
        ...state,
        allPosts: freshPosts,
      }));

      return true;
    } catch (error) {
      console.error("Error during post refresh:", error);
      return false;
    }
  },
  updateUserLimits: async (limits) => {
    try {
      const response = await getUserLimitsFromServer();

      const userData = response;

      if (userData && Object.keys(userData).length > 0) {
        get().saveUserLimitsToState(userData);

        // Save to localstorage
        localStorage.setItem("user_limits", JSON.stringify(userData));
        localStorage.setItem("user_limits_date", JSON.stringify(moment()));
        return userData;
      }
    } catch (err) {
      console.error("Error in getUserLimitsFromServer:", err);
      return { status: "error", info: err.message };
    }
  },
  topics: async () => {
    try {
      const response = await getTopics();

      const topics = response?.data?.result;

      if (topics && Object.keys(topics).length > 0) {
        get().saveTopicsToState(topics);

        // Save to localstorage
        localStorage.setItem("topics", JSON.stringify(topics));
        return topics;
      }
    } catch (err) {
      console.error("Error in topics:", err);
      return { status: "error", info: err.message };
    }
  },
}));

export default useDataStore;
