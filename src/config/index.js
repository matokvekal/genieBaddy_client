// const env = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV || "production";
console.log("env:", env);
export const AvailableLanguages = {
  he: "he",
  en: "en",
};
const LOCAL_SERVER = "localhost";

const development = {
  apiBaseHost: `http://${LOCAL_SERVER}:5000/api/gb`,
};
const production = {
  apiBaseHost: `api/gb`,
};

const envConfigs = {
  development,
  production,
};

export const apiEndPoint = () => {
  return envConfigs[env];
};

const ClientConfig = {
  defaultLanguage: AvailableLanguages.en,

  ...envConfigs[env],
};

export default ClientConfig;
