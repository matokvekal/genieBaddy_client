import axios from "axios";
import { apiEndPoint } from "../config/index";
import Cookies from "js-cookie";



const API_ENDPOINT = apiEndPoint().apiBaseHost;
const configHeader = () => {
  const storedToken = Cookies.get("IdToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  };
  return config;
};
const config = configHeader();

export const getUserTopics = async (data) => {
  let EndPoint = API_ENDPOINT + "/usertopics";
  const response = await axios.get(`${EndPoint}`, data, config);
  return response;
};


export const updateTopic = async (data) => {
  let EndPoint = API_ENDPOINT + "/updategenietopic";
  // console.log("at updateTopic :", EndPoint);
  const response = await axios.put(`${EndPoint}`, JSON.stringify(data), config);
  return response;
};

export const newPost = async (data) => {
  let EndPoint = API_ENDPOINT + "/newpost";
  // console.log("at sendData :", EndPoint, "data:", data);
  const response = await axios.post(
    `${EndPoint}`,
    JSON.stringify(data),
    config
  );
  // console.log("at sendData response:", response);
  return response; //return post object
};
export const userUpdateAction = async (data) => {
  let EndPoint = API_ENDPOINT + "/useraction";
   console.log("at userAction :");
  const response = await axios.post(
    `${EndPoint}`,
    JSON.stringify(data),
    config
  );
  // console.log("at sendData response:", response);
  return response; //return post object
};
