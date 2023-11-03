import { apiEndPoint } from "../config/index";

const API_ENDPOINT = apiEndPoint().apiBaseHost;

export const Login = async (data) => {
  let EndPoint = API_ENDPOINT + "/login";
  let res = await fetch(EndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

