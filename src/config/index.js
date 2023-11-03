


const env = process.env.REACT_APP_ENV || 'prod';

export const AvailableLanguages = {
	he: 'he',
	en: 'en',
};
const LOCAL_SERVER = 'localhost';
const DEV_SERVER = 'localhost';
const staging_SERVER = 'localhost';
const PROD_SERVER = 'localhost';


const local = {
	apiBaseHost: `http://${LOCAL_SERVER}:5000/api/gb`,
};
const dev = {
	apiBaseHost: `http://${DEV_SERVER}:5000/api/gb`,
};
const staging = {
	apiBaseHost: `http://${staging_SERVER}:5000/api/gb`,
};
const prod = {
	apiBaseHost: `http://${PROD_SERVER}:5000/api/gb`,
};

const envConfigs = {
	local,
	dev,
	staging,
	prod,
};
/**
 * Generate config according to env
 */

export const apiEndPoint = () => {
	return envConfigs[env]
}


const ClientConfig = {
	mapsApiKey: 'AIzaSyBFuDLMINZot5gFc0brTb_toEAk-bSVqVQ', // if you want to change api key, you need to change this also in index.html
	defaultLanguage: AvailableLanguages.en,

	// Get all environment configurations
	...envConfigs[env],
};


export default ClientConfig;
