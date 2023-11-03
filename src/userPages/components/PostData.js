import axios from "axios";
import { apiEndPoint } from "../../config/index";
import Cookies from "js-cookie";

const API_ENDPOINT = apiEndPoint().apiBaseHost;

const configHeader = () => {
  const storedToken = Cookies.get("IdToken");
  if (!storedToken) {
    throw new Error("Authorization token is missing");
  }
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  };
};

const PostData = async ({ sanitizedInput,avatar, postId, topic_id, header }) => {
  const endPoint = `${API_ENDPOINT}/userpost`;
  const payload = {
    message: sanitizedInput,
    avatar,
    post_id: postId,
    topic_id,
    header,
  };
  try {
    const response = await axios.post(endPoint, payload, configHeader());
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Unexpected status code");
    }
  } catch (error) {
    console.error("Error in PostData:", error);
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error("error.response.data.error");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw error;
      }
    }
  }
};
export default PostData;