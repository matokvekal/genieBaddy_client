import axios from "axios";
import { apiEndPoint } from "../config/auth";
import { configHeader } from "./Auth";
const API_ENDPOINT = apiEndPoint().apiBaseHost;

export const Login = async (data) => {
  console.log("data at login API_ENDPOINT", API_ENDPOINT);
  let EndPoint = API_ENDPOINT + "/login";
  let res = await fetch(EndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      referrerPolicy: "unsafe_url",
    },
    body: JSON.stringify(data),
  });
  // let responseData = await res.json();
  // responseData.status = res.status;
  return res;
};

export const RegisterUser = async (data) => {
  try {
    let EndPoint = API_ENDPOINT + "/registeruser";
    let res = await fetch(EndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        referrerPolicy: "unsafe_url",
      },
      body: JSON.stringify(data),
    });
    let responseData = await res.json();
    return {
      status: res.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error in fetchServerTopics:", error);
    return null;
  }
};
export const confirmOtp = async (values) => {
  try {
    let EndPoint = API_ENDPOINT + "/confirmCodeEmail";
    let res = await fetch(EndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        referrerPolicy: "unsafe_url",
      },
      body: JSON.stringify(values),
    });
    let responseData = await res.json();
    return {
      status: res.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error in fetchServerTopics:", error);
    return null;
  }
};
