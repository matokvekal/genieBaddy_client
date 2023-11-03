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
      return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getTopics:", error);
    throw error;
  }
};

// export const getGenieChatHeaders = async (headerType) => {
//   const EndPoint = `${API_ENDPOINT}/genieheaders?headerType=${headerType}`;

//   try {
//     let Header = configHeader();
//     const response = await axios.get(EndPoint, Header);
//     return response;
//   } catch (error) {
//     console.error("Error in getGenieChatHeaders:", error);
//     throw error;
//   }
// };

export const fetchUserPosts = async () => {
  const EndPoint = `${API_ENDPOINT}/userposts`;
  // console.log("at fetchUserPosts :", EndPoint,configHeader());
  let Header = configHeader();

  if (!Header) {
    return null;
    //redirect to login
  }
  try {
    const response = await axios.get(EndPoint, Header);
    if (response.status === 200 && response.data?.result) {
      return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in fetchUserPosts:", error);
    throw error;
  }
};
export const fetchGeniePosts = async () => {
  const EndPoint = `${API_ENDPOINT}/genieposts`;
  // console.log("at fetchGeniePosts :", EndPoint,configHeader());
  let Header = configHeader();

  if (!Header) {
    return null;
    //redirect to login
  }
  try {
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
      return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getuserlimits:", error);
    throw error;
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
      return response.data;
    } else {
      // response.message=response.data.error;
      response.data.info = "no data";
      return response.data;
    }
  } catch (error) {
    console.error("Error in genieGetNewPosts:", error);
    throw error;
  }
};
// export const getPost = async (postId) => {
//   const EndPoint = `${API_ENDPOINT}/post?id=${postId}`;
//   // console.log("at getpost :", EndPoint);
//   try {
//     let Header = configHeader();
//     const response = await axios.get(EndPoint, Header);
//     return response;
//   } catch (error) {
//     console.error("Error in getPost:", error);
//     throw error;
//   }
// };

// export const updateTopic = async (data) => {
//   const EndPoint = `${API_ENDPOINT}/updategenietopic`;
//   console.log("at updateTopic :", EndPoint);
//   try {
//     const response = await axios.put(
//       EndPoint,
//       JSON.stringify(data),
//       configHeader()
//     );
//     return response;
//   } catch (error) {
//     console.error("Error in updateTopic:", error);
//     throw error;
//   }
// };

// export const genieChat = async (data) => {
//   const EndPoint = `${API_ENDPOINT}/genie`;
//   console.log("at genieChat :", EndPoint);
//   try {
//     const response = await axios.post(
//       EndPoint,
//       JSON.stringify(data),
//       configHeader()
//     );
//     return response;
//   } catch (error) {
//     console.error("Error in genieChat:", error);
//     throw error;
//   }
// };
