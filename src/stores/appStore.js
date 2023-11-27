import { createStore } from "zustand";
import Cookies from "js-cookie";
import { Login } from "../services/Auth";
import moment from "moment";
import { POST_STATUS } from "../constants";

import {
  fetchUserPosts,
  fetchGeniePosts,
  getUserLimitsFromServer,
  getTopics,
  fetchUserNewChats,
  fetchGenieNewChats,
  userReadPostById,
} from "services/getData";
import { getpostById } from "services/getData";
import { exists } from "i18next";
export const initialState = {
  userId: "",
  userName: "",
  NickName: localStorage.getItem("user-nickName") || "user",
  userType: "",
  isNewChat: true,
  loginStatus: false,
  mode: "development",
  topics: [],
  allPosts: [],
  geniePosts: [],
  genieNewPostsCounter: 0,
  userFilter: POST_STATUS.DEFAULT,
  postId: null,
  modals: {
    sidebar: false,
    action: false,
    filter: false,
    userseting: false,
    usertopics: false,
  },
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
      newChatsCounter: Number(counter),
    }));
  },
  savePostsToIndexLS: (posts) => {
    try {
      localStorage.setItem("userPosts", JSON.stringify(posts));
    } catch (error) {
      console.error("Error saving posts to IndexedDB:", error);
    }
  },
  updateModalsStates: (modalName, action, the_rest = null) => {
    console.log("updateModalsStates", modalName, action, the_rest);
    set((state) => {
      let newModalsState = { ...state.modals };
      if (modalName === "all" && action === "close") {
        Object.keys(newModalsState).forEach((key) => {
          newModalsState[key] = false;
        });
      } else {
        if (action === "open") {
          newModalsState[modalName] = true;
        } else if (action === "close") {
          newModalsState[modalName] = false;
        } else if (action === "toggle") {
          newModalsState[modalName] = !state.modals[modalName];
        }

        if (the_rest === null) {
          Object.keys(newModalsState).forEach((key) => {
            if (key !== modalName) newModalsState[key] = false;
          });
        }
      }
      return { ...state, modals: newModalsState };
    });
  },

  setUserFilter: (data) => {
    set((state) => ({
      ...state,
      userFilter: data,
    }));
  },
  setPostId: (id) => {
    set((state) => ({
      ...state,
      postId: id,
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
    set((state) => ({
      ...state,
      NickName: NickName,
    }));
    localStorage.setItem("user-nickName", NickName);
  },
  getUsername: () => {
    const state = get();
    let userName =
      get().userName || localStorage.getItem("userName") || state.userType;
    return userName;
  },
  getNickName: () => {
    let NickName =
      get().NickName || localStorage.getItem("user-nickName") || "user";
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
    localStorage.removeItem("user-nickName");
    localStorage.removeItem("i18nextLng");
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
      return { status: "error", info: err.message };
    }
  },
  getGeniePosts: async () => {
    try {
      console.log("start getGeniePosts");
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
  handleUserNotRead: async () => {
    try {
      console.log("start handleUserNotRead");
      const newPosts = await fetchUserNewChats();
      if (newPosts.length === 0) {
        return { status: "no new chats" };
      } else {
        const curentPosts = JSON.parse(localStorage.getItem("userPosts"));
        //replace at curentPosts the posts with the same id from newPosts
        curentPosts.forEach((post) => {
          const newPost =
            newPosts &&
            newPosts.length > 0 &&
            newPosts.find((newPost) => newPost.id === post.id);
          if (newPost) {
            post = newPost;
            // console.log("get().newChatsCounter", get().newChatsCounter);
            get().updateNewChatsCounter(get().newChatsCounter + 1);
          }
        });
        get().savePostsToState(curentPosts);
        localStorage.setItem("userPosts", JSON.stringify(curentPosts));
        return true;
      }
    } catch (err) {
      console.log("error in handleUserNotRead", err);
      return false;
    }
  },
  userReadPost: async (postId) => {
    try {
      const result = await userReadPostById(postId);
      if (result) {
        const localStoragePosts = JSON.parse(localStorage.getItem("userPosts"));
        for (let post of localStoragePosts) {
          if (post != null && post.id === postId) {
            post.user_read = 1;
            break;
          }
        }
        get().savePostsToState(localStoragePosts);
        localStorage.setItem("userPosts", JSON.stringify(localStoragePosts));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in userReadPost:", error);
      return null;
    }
  },
  getUserPostById: async (post_id) => {
    try {
      // console.log("start getPostById");
      const newPost = await getpostById(post_id); ///////////////////////////////////////
      // console.log("newPost", newPost);
      const localStoragePosts = JSON.parse(localStorage.getItem("userPosts"));
      // console.log("localStoragePosts", localStoragePosts);
      // const filterdPosts = localStoragePosts.filter((post) => post.id !== post_id);
      const filteredPosts = [];

      for (let post of localStoragePosts) {
        if (post != null && post.id !== post_id) {
          filteredPosts.push(post);
        }
      }
      // console.log("filterdPosts", filterdPosts);
      if (newPost.data.result.length > 0) {
        filteredPosts.push(newPost.data.result[0]);
      }
      // console.log("filterdPosts", filterdPosts);
      get().savePostsToState(filteredPosts);
      if (filteredPosts && filteredPosts.length > 0) {
        localStorage.setItem("userPosts", JSON.stringify(filteredPosts));
      } else {
        localStorage.removeItem("userPosts");
      }
      return true;

      //delete post from store and from ls

      //find post by id
      //remove post
      //if newPost, then push new post
      //update store
      //update ls
    } catch (err) {
      console.log("error in handleUserNotRead", err);
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
