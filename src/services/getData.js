import axios from "axios";
import { apiEndPoint } from "../config/index";
import Cookies from "js-cookie";

const API_ENDPOINT = apiEndPoint().apiBaseHost;

const configHeader = () => {
  const storedToken = Cookies.get("IdToken");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  };
};

export const fetchServerTopics = async (data) => {

  const EndPoint = `${API_ENDPOINT}/topics`;
  console.log("at fetchServerTopics :", EndPoint);
  try {
    let Header = configHeader();
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in fetchServerTopics:", error);
    // throw error;
    return null;
  }
};

export const fetchUserPosts = async () => {
  const EndPoint = `${API_ENDPOINT}/userposts`;

  let Header = configHeader();
  if (!Header) {
    return null;
  }
  try {
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in fetchUserPosts:", error);
    // throw error;
    return null;
  }
};
export const fetchUserNewChats = async () => {//user check wvwry 1 min
  try {
    const EndPoint = `${API_ENDPOINT}/usernewchats`;
    // console.log("at fetchUserPosts :", EndPoint,configHeader());
    let Header = configHeader();

    if (!Header) {
      return null;
      //redirect to login
    }

    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in fetchUserNewChats:", error);
    // throw error;
    return null;
  }
};
export const fetchGeniePosts = async () => {
  try {
    const EndPoint = `${API_ENDPOINT}/genieposts`;
    // console.log("at fetchGeniePosts :", EndPoint,configHeader());
    let Header = configHeader();

    if (!Header) {
      return null;
      //redirect to login
    }
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in fetchGeniePosts:", error);
    // throw error;
    return null;
  }
};


export const getUserLimitsFromServer = async () => {
  const EndPoint = `${API_ENDPOINT}/getuserlimits`;
  let Header = configHeader();
  if (!Header) {
    return null;
  }
  try {
    const response = await axios.get(EndPoint, Header);

    if (response.status === 200 && response.data?.result) {
      return response;
      // return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getuserlimits:", error);
    // throw error;
    return null;
  }
};
export const genieGetNewPosts = async () => {
  const EndPoint = `${API_ENDPOINT}/genienewposts`;
  // console.log("at fetchGeniePosts :", EndPoint,configHeader());
  let Header = configHeader();

  if (!Header) {
    return null;
  }
  try {
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      // return response.data.result;
      return response;
    } else {
      // response.message=response.data.error;
      response.data.info = "no data";
      return response;
    }
  } catch (error) {
    console.error("Error in genieGetNewPosts:", error);
    // throw error;
    return null;
  }
};
export const genieGetPostByid = async (postId) => {
  const EndPoint = `${API_ENDPOINT}/geniegetpostbyid?postId=${postId}`;
  let Header = configHeader();

  if (!Header) {
    return null;
  }
  try {
    console.log("at geniegetpostbyid :", EndPoint, Header);
    const response = await axios.get(EndPoint, Header);

    if (response.status === 200 && response.data?.result) {
      return response;
    } else {
      response.data.info = "no data";
      return response;
    }
  } catch (error) {
    console.error("Error in genieGetNewPosts:", error);
    // throw error;
    return null;
  }
};
export const userReadPostById = async (postId) => {
  const EndPoint = `${API_ENDPOINT}/userreadposts?postid=${postId}`;
  let Header = configHeader();

  if (!Header) {
    return null;
  }
  try {
    console.log("at userReadPostById :", EndPoint, Header);
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.user_read) {
      return response.data?.user_read;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in userReadPostById:", error);
    return null;
  }
};
export const genieReadPostById = async (postId) => {
  const EndPoint = `${API_ENDPOINT}/geniereadposts?postid=${postId}`;
  let Header = configHeader();

  if (!Header) {
    return null;
  }
  try {
    
    console.log("at genieReadPostById :", EndPoint, Header);
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.post_id) {
      return response.data?.post_id;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in genieReadPostById:", error);
    return null;
  }
};
export const getpostById = async (postId) => {
  const EndPoint = `${API_ENDPOINT}/getpostbyid?postId=${postId}`;
  let Header = configHeader();

  if (!Header) {
    return null;
  }
  try {
    console.log("at getpostById :", EndPoint, Header);
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response;
    } else {
      response.data.info = "no data";
      return response;
    }
  } catch (error) {
    console.error("Error in genieGetNewPosts:", error);
    // throw error;
    return null;
  }
};
export const fetchGenieNewChats = async () => {
  const EndPoint = `${API_ENDPOINT}/genienewchats`;
  let Header = configHeader();

  if (!Header) {
    return null;
  }
  try {
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in fetchGenieNewChats:", error);
    return null;
  }
};
export const genieClaimPost = async (postId, avatar,genieNickname) => {
  const EndPoint = `${API_ENDPOINT}/genieclamepost`;
  try {
    const response = await axios.post(
      EndPoint,
      JSON.stringify({ postId, avatar,genieNickname }),
      configHeader()
    );
    return response;
  } catch (error) {
    console.error("Error in genieClaimPost:", error);
    // throw error;
    if(error.response.data){
      return error.response.data
    }
    return null;
  }
};
export const updateAction = async (data) => {
  const EndPoint = `${API_ENDPOINT}/action`;
  console.log("at action :");
  const response = await axios.post(
    EndPoint,
    JSON.stringify(data),
    configHeader()
  );
  return response;
};
export const userPostData = async (payload) => {
  try {
    const EndPoint = `${API_ENDPOINT}/userpost`;
    console.log("at userPostDatation :");
    const response = await axios.post(
      EndPoint,
      payload,
      configHeader()
    );
    return response;
  } catch (error) {
    console.error("Error in userPostData:", error);
    return false;
  }
};
export const geniePostData = async (payload) => {
  try {
    const EndPoint = `${API_ENDPOINT}/geniepost`;
    console.log("at geniePostData :");
    const response = await axios.post(
      EndPoint,
      payload,
      configHeader()
    );
    return response;
  } catch (error) {
    console.error("Error in geniePostData:", error);
    return false;
  }
};
export const userRefreshPosts = async () => {
  const EndPoint = `${API_ENDPOINT}/userrefreshposts`;

  let Header = configHeader();
  if (!Header) {
    return null;
  }
  try {
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in userRefreshPosts:", error);
    return null;
  }
};