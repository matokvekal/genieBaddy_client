const env = process.env.ENV || "dev";
export const AvailableLanguages = {
  he: "he",
  en: "en",
};
const LOCAL_SERVER = "localhost";
// const PROD_SERVER = "prod";

const dev = {
  apiBaseHost: `http://${LOCAL_SERVER}:5000/api/gb`,
};
const prod = {
  apiBaseHost: `api/gb`,
};

const envConfigs = {
  dev,
  prod,
};

export const apiEndPoint = () => {
  return envConfigs[env];
};

const ClientConfig = {
  defaultLanguage: AvailableLanguages.en,

  ...envConfigs[env],
};

export default ClientConfig;
