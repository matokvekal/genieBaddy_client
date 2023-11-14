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

export const getTopics = async (data) => {
  const EndPoint = `${API_ENDPOINT}/topics`;
  console.log("at getTopics :", EndPoint);
  try {
    let Header = configHeader();
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      // return response.data.result;
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getTopics:", error);
    throw error;
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
    throw error;
  }
};
export const fetchUserNewChats = async () => {
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
    throw error;
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
    throw error;
  }
};
export const fetchGenieNewChats = async () => {
  const EndPoint = `${API_ENDPOINT}/genienewchats`;
  // console.log("at fetchGeniePosts :", EndPoint,configHeader());
  let Header = configHeader();

  if (!Header) {
    return null;
    //redirect to login
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
    console.error("Error in fetchGenieNewChats:", error);
    throw error;
  }
};
export const genieCoosePost = async (postId,avatar) => {
  const EndPoint = `${API_ENDPOINT}/geniechoosepost`;
  try {
    const response = await axios.post(
      EndPoint,
      JSON.stringify({ postId: postId ,avatar:avatar}),
      configHeader()
    );
    return response;
  } catch (error) {
    console.error("Error in genieCoosePost:", error);
    throw error;
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
    throw error;
  }
};
export const genieGetNewPosts = async () => {
  debugger
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
    throw error;
  }
};
