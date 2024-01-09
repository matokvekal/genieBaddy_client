import { createStore } from "zustand";
import Cookies from "js-cookie";
import { Login, RegisterUser, confirmOtp } from "../services/Auth";
import moment from "moment";
import { POST_STATUS } from "../constants";

import {
  fetchUserPosts,
  fetchGeniePosts,
  getUserLimitsFromServer,
  fetchServerTopics,
  fetchUserNewChats,
  fetchGenieNewChats,
  userReadPostById,
  genieReadPostById,
  getpostById,
  userPostData,
  geniePostData,
  userRefreshPosts,
  genieRefreshPosts,
 
} from "services/getData";
// import { exists } from "i18next";
export const initialState = {
  userId: "",
  userName: "",
  userNickName: localStorage.getItem("userNickName"),
  genieNickName: localStorage.getItem("genieNickName"),
  userType: "",
  isNewChat: true,
  loginStatus: false,
  mode: "development",
  topics: [],
  topicsDate: null,
  userPosts: [],
  geniePosts: [],
  genieNewPostsCounter: 0,
  userGenieFilter: POST_STATUS.DEFAULT,
  postId: null,
  modals: {
    sidebar: false,
    action: false,
    filter: false,
    userseting: false,
    usertopics: false,
  },
  geniePages: {
    genieClaimPost: false,
    GenieAchievements: false,
    geniePosts: true,
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
  saveUserPostsToState: (posts) => {
    set((state) => ({
      ...state,
      userPosts: posts,
    }));
  },
  saveGeniePostsToState: (posts) => {
    set((state) => ({
      ...state,
      geniePosts: posts,
    }));
  },
  saveUserLimitsToState: (limits) => {
    set((state) => ({
      ...state,
      user_limits: limits,
    }));
  },
  saveTopicsToState: (topics, topicsDate) => {
    set((state) => ({
      ...state,
      topics: topics,
      topicsDate: topicsDate,
    }));
  },

  updateGenieNewPostCounter: (counter) => {
    //for claim post
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
  updateGeniePagesStates: (pageName, action, the_rest = null) => {
    set((state) => {
      let newGeniePagesState = { ...state.geniePages };
      if (pageName === "all" && action === "close") {
        Object.keys(newGeniePagesState).forEach((key) => {
          newGeniePagesState[key] = false;
        });
      } else {
        if (action === "open") {
          newGeniePagesState[pageName] = true;
        } else if (action === "close") {
          newGeniePagesState[pageName] = false;
        } else if (action === "toggle") {
          newGeniePagesState[pageName] = !state.geniePages[pageName];
        }

        if (the_rest === null) {
          Object.keys(newGeniePagesState).forEach((key) => {
            if (key !== pageName) newGeniePagesState[key] = false;
          });
        }
      }
      return { ...state, geniePages: newGeniePagesState };
    });
  },
  setUserGenieFilter: (data) => {
    set((state) => ({
      ...state,
      userGenieFilter: data,
    }));
  },
  setPostId: (id) => {
    set((state) => ({
      ...state,
      postId: id,
    }));
  },
  setUserType: (type) => {
    set((state) => ({
      ...state,
      userType: type,
    }));
  },
  getUserType: () => {
    let userType = get().userType;
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
  updateUserNickName: (userNickName) => {
    set((state) => ({
      ...state,
      userNickName: userNickName,
    }));
    localStorage.setItem("userNickName", userNickName);
  },
  updateGenieNickName: (genieNickName) => {
    set((state) => ({
      ...state,
      genieNickName: genieNickName,
    }));
    localStorage.setItem("genieNickName", genieNickName);
  },
  getUserName: () => {
    const state = get();
    let userName =
      get().userName || localStorage.getItem("userName") || state.userType;
    return userName;
  },
  getUserNickName: () => {
    let userNickName =
      get().userNickName || localStorage.getItem("userNickName") || "user";
    return userNickName;
  },
  getGenieNickName: () => {
    let genieNickName =
      get().genieNickName || localStorage.getItem("genieNickName") || "genie";
    return genieNickName;
  },
  cleanGeniePosts: () => {
    localStorage.removeItem("geniePosts");
    set((state) => ({
      ...state,
      geniePosts: [],
    }));
  },

  triggerToast: (message, type = "error") => {
    console.log(`Toast triggered: Message - ${message}, Type - ${type}`); // Debugging output
    set((state) => ({
      showToast: true,
      toastMessage: message,
      toastType: type,
    }));
  },
  resetToast: () => set({ showToast: false, toastMessage: "" }),
  logOut: () => {
    set((state) => ({
      ...state,
      userName: "",
      userType: "",
      loginStatus: false,
      userPosts: [],
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
    localStorage.removeItem("userNickName");
    localStorage.removeItem("genieNickName");
    localStorage.removeItem("i18nextLng");
    set({ ...initialState });
  },
  setLoginStatus: (loginStatus) => {
    set((state) => ({
      ...state,
      loginStatus: loginStatus,
    }));
    localStorage.setItem("authenticated", loginStatus);
  },
  handleLogin: async ({ username, password, userRole, page }) => {
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
  handleregister: async ({ username, password, userRole }) => {
    try {
      if (!username || !password) {
        return false;
      }
      let AuthParameters = {
        email: username,
        password: password,
        user_role: userRole,
      };
      const response = await RegisterUser(AuthParameters);
      if (response.status !== 200) {
        return { info: "notFound", status: response.status };
      }
      return { response };
    } catch (e) {
      console.error("error in handleLogin", e);
    }
  },
  handleConfirmOtp: async (confirmationCode, email) => {
    try {
      if (!confirmationCode || !/^\d{6}$/.test(confirmationCode)) {
        console.error("Invalid OTP: OTP must be a 6 digit number");
        return { info: "invalidOtp", status: 400 }; // You can set an appropriate status code
      }
      const values = {};
      values.email = email;
      values.confirmationCode = confirmationCode;

      let AuthParameters = {
        values,
      };
      const response = await confirmOtp(AuthParameters);
      if (response.status !== 200) {
        return { info: "notFound", status: response.status };
      }
      return { response };
    } catch (e) {
      console.error("error in handleLogin", e);
    }
  },
  getUserPosts: async () => {
    try {
      const currentPosts = get().userPosts;
      if (currentPosts?.length) {
        return currentPosts;
      }

      const dbPosts = localStorage.getItem("userPosts");
      if (dbPosts) {
        const posts = JSON.parse(dbPosts);
        get().saveUserPostsToState(posts);
        return posts;
      }

      // Fetch from server
      const res = await fetchUserPosts();
      const data = res?.data?.result;
      if (data.length === 0) {
        return null;
      } else {
        get().saveUserPostsToState(data);
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
        get().saveGeniePostsToState(geniePosts);
        return geniePosts;
      }
      const data = await fetchGeniePosts();
      if (data && data.length > 0) {
        get().saveGeniePostsToState(data);
        localStorage.setItem("geniePosts", JSON.stringify(data));
        return data;
      } else {
        return null;
      }
    } catch (err) {
      return { status: "error", info: err.message };
    }
  },
  handleUserNotRead: async () => {
    try {
      console.log("start handleUserNotRead 1 min");
      const newPosts = await fetchUserNewChats();
      if (newPosts.length === 0) {
        return { status: "no new chats" };
      } else {
        let curentPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");
        // Process each newPost
        newPosts.forEach((newPost) => {
          const existingPostIndex = curentPosts.findIndex(
            (p) => p.id === newPost.id
          );

          if (existingPostIndex !== -1) {
            // update in any case
            // If post exists and the status is different, update it
            // if (
            //   curentPosts[existingPostIndex].post_status !== newPost.post_status
            // ) {
            curentPosts[existingPostIndex] = newPost;
            get().updateNewChatsCounter(get().newChatsCounter + 1);
            // }
          } else {
            // If post does not exist, add it
            curentPosts.push(newPost);
            get().updateNewChatsCounter(get().newChatsCounter + 1);
          }
        });

        // Save updated posts to state and localStorage
        get().saveUserPostsToState(curentPosts);
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
        get().saveUserPostsToState(localStoragePosts);
        localStorage.setItem("userPosts", JSON.stringify(localStoragePosts));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in userReadPost:", error);
      return null;
    }
  },
  genieReadPost: async (postId) => {
    try {
      const result = await genieReadPostById(postId);
      if (result) {
        const localStoragePosts = JSON.parse(
          localStorage.getItem("geniePosts")
        );
        for (let post of localStoragePosts) {
          if (post != null && post.id === postId) {
            post.genie_read = 1;
            break;
          }
        }
        get().saveGeniePostsToState(localStoragePosts);
        localStorage.setItem("geniePosts", JSON.stringify(localStoragePosts));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in genieReadPost:", error);
      return null;
    }
  },
  getActionPostById: async (post_id) => {
    try {
      // console.log("start getPostById");
      const newPost = await getpostById(post_id);
      if (!newPost) {
        return false;
      }

      const localStoragePosts = JSON.parse(localStorage.getItem("userPosts"));

      const filteredPosts = [];

      for (let post of localStoragePosts) {
        if (post != null && post.id !== post_id) {
          filteredPosts.push(post);
        }
      }

      if (newPost.data.result.length > 0) {
        filteredPosts.push(newPost.data.result[0]);
      }

      get().saveUserPostsToState(filteredPosts);
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
      console.log("error in getActionPostById", err);
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
        let curentPosts = localStorage.getItem("geniePosts");
        curentPosts = JSON.parse(curentPosts);
        //replace at curentPosts the posts with the same id from newPosts
        // posts.forEach((post) => {
        //   const newPost = newPosts.find((newPost) => newPost.id === post.id);
        //   if (newPost) {
        //     post = newPost;
        //     get().updateNewChatsCounter(get().newChatsCounter + 1);
        //   }
        // });

        newPosts.forEach((newPost) => {
          const existingPostIndex = curentPosts.findIndex(
            (p) => p.id === newPost.id
          );
          if (existingPostIndex !== -1) {
            // update in any case
            curentPosts[existingPostIndex] = newPost;
            get().updateNewChatsCounter(get().newChatsCounter + 1);
            // }
          } else {
            curentPosts.push(newPost);
            get().updateNewChatsCounter(get().newChatsCounter + 1);
          }
        });
        get().saveGeniePostsToState(curentPosts);
        localStorage.setItem("geniePosts", JSON.stringify(curentPosts));
        return true;
      }
    } catch (err) {
      console.log("error in handleGenieNewChats", err);
      return false;
    }
  },
  refreshUserPosts: async () => {
    try {
      const result = await userRefreshPosts();
      if (result.status !== 200) {
        throw new Error(`Failed to fetch posts: ${result.status}`);
      }
      if (result.data.result.length === 0) {
        return false;
      }
      const freshPosts = result?.data?.result;

      set((state) => {
        const existingPostsMap = new Map(
          state.userPosts.map((post) => [post.id, post])
        );

        freshPosts.forEach((freshPost) => {
          existingPostsMap.set(freshPost.id, freshPost);
        });

        const updatedPosts = Array.from(existingPostsMap.values());
        state.saveUserPostsToState(updatedPosts); // Update the store

        localStorage.setItem("userPosts", JSON.stringify(updatedPosts)); // Update local storage
        return { userPosts: updatedPosts };
      });

      return true;
    } catch (error) {
      console.error("Error during refreshUserPosts:", error);
      return false;
    }
  },

  refreshGeniePosts: async () => {
    try {
      const result = await genieRefreshPosts();

      if (result.status !== 200) {
        throw new Error(`Failed to fetch GeniePosts: ${result.status}`);
      }
      if (result.data.result.length === 0) {
        return false;
      }
      const freshPosts = result?.data?.result;

      // Fetch current posts from local storage
      const currentPostsString = localStorage.getItem("geniePosts");
      let currentPostsMap = new Map(
        currentPostsString
          ? JSON.parse(currentPostsString).map((post) => [post.id, post])
          : []
      );

      // Update current posts with fresh posts
      freshPosts.forEach((freshPost) => {
        currentPostsMap.set(freshPost.id, freshPost);
      });

      // Convert Map back to array for local storage and state update
      const updatedPosts = Array.from(currentPostsMap.values());
      localStorage.setItem("geniePosts", JSON.stringify(updatedPosts));

      set((state) => ({
        ...state,
        geniePosts: updatedPosts,
      }));
      return true;
    } catch (error) {
      console.error("Error during refreshGeniePosts:", error);
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
      const response = await fetchServerTopics();
      const topics = response?.data?.result;
      if (topics && Object.keys(topics).length > 0) {
        const topicsDate = moment();
        get().saveTopicsToState(topics, topicsDate);
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
      let topics = get().topics;
      let topicsDate = get().topicsDate;

      if (!topicsDate || moment().diff(moment(topicsDate), "hours") >= 24) {
        topics = JSON.parse(localStorage.getItem("topics"));
        topicsDate = JSON.parse(localStorage.getItem("topicsDate"));

        if (
          !topics ||
          !topicsDate ||
          moment().diff(moment(topicsDate), "hours") >= 24
        ) {
          return await get().fetchTopics();
        } else {
          get().saveTopicsToState(topics, topicsDate);
        }
      }

      return topics;
    } catch (err) {
      console.error("Error in getTopics:", err);
      return { status: "error", info: err.message };
    }
  },
  userPostChat: async ({
    sanitizedInput,
    avatar,
    postId,
    topic_id,
    header,
    userNickName,
  }) => {
    const payload = {
      message: sanitizedInput,
      avatar,
      post_id: postId,
      topic_id,
      header,
      userNickName,
    };
    try {
      const response = await userPostData(payload);
      if (response.status === 200) {
        // get().refreshUserPosts();
        return response;
      } else {
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      console.error("Error in userPostChat:", error);
      if (error) {
        return error.message;
      }
    }
  },
  geniePostChat: async ({ sanitizedInput, postId }) => {
    const payload = {
      message: sanitizedInput,
      post_id: postId,
    };
    try {
      const response = await geniePostData(payload);
      if (response.status === 200) {
        // get().refreshGeniePosts();
        return response;
      } else {
        console.log("Unexpected status code");
        return "error";
      }
    } catch (error) {
      console.error("Error in geniePostChat:", error);
      if (error) {
        return error.message;
      }
    }
  },
}));

export default useDataStore;
