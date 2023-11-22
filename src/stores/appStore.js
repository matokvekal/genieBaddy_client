import { createStore } from "zustand";
import Cookies from "js-cookie";
import { Login } from "../services/Auth";
import moment from "moment";

import {
  fetchUserPosts,
  fetchGeniePosts,
  getUserLimitsFromServer,
  getTopics,
  fetchUserNewChats,
  fetchGenieNewChats,
} from "services/getData";
export const initialState = {
  userId: "",
  userName: "",
  NickName: localStorage.getItem("NickName")||"user",
  userType: "",
  // userType: "user",
  sideBarState: false,
  postModatState: true,
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
  toastMessage: "",
  newChatsCounter: 0,
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
  updateNewChatsCounter: (counter) => {
    set((state) => ({
      ...state,
      newChatsCounter: counter,
    }));
  },
  savePostsToIndexLS: (posts) => {
    try {
      localStorage.setItem("userPosts", JSON.stringify(posts));
    } catch (error) {
      console.error("Error saving posts to IndexedDB:", error);
    }
  },

  handlePostModal: (data) => {
    set((state) => ({
      ...state,
      postModatState: data,
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
  updateNickName: (NickName) => {
    debugger
    set((state) => ({
      ...state,
      NickName: NickName,
    }));
    localStorage.setItem("NickName", NickName);
  },
  getUsername: () => {
    const state = get();
    let userName =
      get().userName || localStorage.getItem("userName") || state.userType;
    return userName;
  },
  getNickName: () => {
    let NickName = get().NickName || localStorage.getItem("NickName");
    return NickName;
  },
  cleanGeniePosts: () => {
    localStorage.removeItem("geniePosts");
    set((state) => ({
      ...state,
      geniePosts: [],
    }));
  },

  triggerToast: (message, type = "error") =>
    set((state) => ({
      showToast: true,
      toastMessage: message,
      toastType: type,
    })),
  resetToast: () => set({ showToast: false, toastMessage: "" }),
  logOut: () => {
    set((state) => ({
      ...state,
      userName: "",
      userType: "",
      loginStatus: false,
      allPosts: [],
      geniePosts: [],
      genieNewPostsCounter: 0,
      topics: [],
    }));
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_limits");
    localStorage.removeItem("user_limits_date");
    localStorage.removeItem("topics");
    localStorage.removeItem("topicsdate");
    localStorage.removeItem("userName");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("geniePosts");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userPosts");
    Cookies.remove("IdToken");
    localStorage.removeItem("userPosts");
    localStorage.removeItem("nickName");
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
      localStorage.removeItem("userPosts");
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

      const dbPosts = localStorage.getItem("userPosts");
      if (dbPosts) {
        const posts = JSON.parse(dbPosts);
        get().savePostsToState(posts);
        return posts;
      }

      // Fetch from server
      const res = await fetchUserPosts();
      const data = res?.data?.result;
      if (data.length === 0) {
        return { status: "no data" };
      } else {
        get().savePostsToState(data);
        get().savePostsToIndexLS(data);

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
      const posts = localStorage.getItem("geniePosts");
      if (posts) {
        const geniePosts = JSON.parse(posts);
        get().savePostsToState(geniePosts);
        return geniePosts;
      }

      const data = await fetchGeniePosts();
      if (data.length === 0) {
        return { status: "no data" };
      } else {
        get().savePostsToState(data);
        localStorage.setItem("geniePosts", JSON.stringify(data));
        return data;
      }
    } catch (err) {
      return { status: "error", info: err.message };
    }
  },
  handleUserNewChats: async () => {
    try {
      const newPosts = await fetchUserNewChats();
      if (newPosts.length === 0) {
        return { status: "no new chats" };
      } else {
        const curentPosts = JSON.parse(localStorage.getItem("userPosts"));
        debugger;
        //replace at curentPosts the posts with the same id from newPosts
        curentPosts.forEach((post) => {
          const newPost =
            newPosts &&
            newPosts.length > 0 &&
            newPosts.find((newPost) => newPost.id === post.id);
          if (newPost) {
            post = newPost;
            get().updateNewChatsCounter(get().newChatsCounter + 1);
          }
        });
        get().savePostsToState(curentPosts);
        localStorage.setItem("userPosts", JSON.stringify(curentPosts));
        return true;
      }
    } catch (err) {
      console.log("error in handleUserNewChats", err);
      return false;
    }
  },
  handleGenieNewChats: async () => {
    try {
      let newPosts = await fetchGenieNewChats();
      if (newPosts.data.result.length === 0) {
        return { status: "no new chats" };
      } else {
        newPosts = newPosts.data.result;
        const curentPosts = localStorage.getItem("geniePosts");
        const posts = JSON.parse(curentPosts);
        //replace at curentPosts the posts with the same id from newPosts
        posts.forEach((post) => {
          const newPost = newPosts.find((newPost) => newPost.id === post.id);
          if (newPost) {
            post = newPost;
            get().updateNewChatsCounter(get().newChatsCounter + 1);
          }
        });
        get().savePostsToState(posts);
        localStorage.setItem("geniePosts", curentPosts);
        return true;
      }
    } catch (err) {
      console.log("error in handleGenieNewChats", err);
      return false;
    }
  },
  refreshUserPosts: async () => {
    try {
      const result = await fetchUserPosts();

      if (result.status !== 200) {
        throw new Error(`Failed to fetch posts: ${result.status}`);
      }
      const freshPosts = result?.data?.result;
      set((state) => ({
        ...state,
        allPosts: [],
      }));

      localStorage.removeItem("userPosts");

      localStorage.setItem("userPosts", JSON.stringify(freshPosts));

      set((state) => ({
        ...state,
        allPosts: freshPosts,
      }));

      return true;
    } catch (error) {
      console.error("Error during post refreshUserPosts:", error);
      return false;
    }
  },
  refreshGeniePosts: async () => {
    const result = await fetchGeniePosts();

    if (result.status !== 200) {
      throw new Error(`Failed to fetch  GeniePosts: ${result.status}`);
    }
    const freshPosts = result?.data?.result;
    try {
      set((state) => ({
        ...state,
        allPosts: [],
      }));
      localStorage.removeItem("geniePosts");
      localStorage.setItem("geniePosts", JSON.stringify(freshPosts));

      set((state) => ({
        ...state,
        allPosts: freshPosts,
      }));
      return true;
    } catch (error) {
      console.error("Error during post refreshGeniePosts:", error);
      return false;
    }
  },
  updateUserLimits: async (limits) => {
    try {
      const response = await getUserLimitsFromServer();
      const userData = response.data.result;

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
  fetchTopics: async () => {
    try {
      const response = await getTopics();

      const topics = response?.data?.result;

      if (topics && Object.keys(topics).length > 0) {
        get().saveTopicsToState(topics);

        // Save to localstorage
        localStorage.setItem("topics", JSON.stringify(topics));
        localStorage.setItem("topicsdate", JSON.stringify(moment()));
        return topics;
      }
    } catch (err) {
      console.error("Error in topics:", err);
      return { status: "error", info: err.message };
    }
  },
  getTopics: async () => {
    try {
      //if no topics at state take from ls, if not at ls fetch
      //if topic old then 24 hores also fetch
      let topics = get().topics;
      if (topics && Object.keys(topics).length > 0) {
        return topics;
      } else {
        topics = localStorage.getItem("topics");
        let topicsDate = localStorage.getItem("topicsdate");
        if (topics && topicsDate < moment().subtract(24, "hours")) {
          const topics = JSON.parse(topics);
          get().saveTopicsToState(topics);
          return topics;
        } else {
          topics = get().fetchTopics();
        }
        return topics;
      }
    } catch (err) {
      console.error("Error in topics:", err);
      return { status: "error", info: err.message };
    }
  },
}));

export default useDataStore;
