import { apiEndPoint } from "../config/index";
const API_ENDPOINT = apiEndPoint().apiBaseHost;

export const Login = async (data) => {
  // console.log("API_ENDPOINT", API_ENDPOINT);
  let EndPoint = API_ENDPOINT + "/login";
  let res = await fetch(EndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      referrerPolicy: "unsafe_url",
    },
    body: JSON.stringify(data),
  });
  console.log("res", res);
  return res;
};
