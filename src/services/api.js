import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN_KEY_ON_HEADERS = 'token';

export class AxiosHttp {
  projectAxios;

  constructor(baseUrl) {
    this.projectAxios = axios.create({
      baseURL: baseUrl,
    });

    // Set interceptor on the request
    this.projectAxios.interceptors.request.use(async (config) => {
      if (!config.headers) {
        config.headers = {
          'Content-Type': 'application/json',
        };
      }
      // Check if there is NO token on the headers
      // Also checks if this request should have token
      if (!config.headers[TOKEN_KEY_ON_HEADERS]) {
        // Set token from storage
        const storedToken = Cookies.get('IdToken');
        if (storedToken) {
          config.headers[TOKEN_KEY_ON_HEADERS] = storedToken;
        }
      }

      return config;
    });
  }

  /***
   * Base http GET request
   * @url string, request URL
   * @queryParams object, request query parameters
   * @headers object
   * @returns promise
   */
  get(url, queryParams = {}, headers = {}) {
    return this.projectAxios.get(url, {
      params: queryParams,
      withCredentials: true,
      headers,
    });
  }

  /***
   * Base http POST request
   * @url string, request URL
   * @body any, request body
   * @headers object
   * @returns promise
   */
  post(url, body, headers) {
    return this.projectAxios.post(url, body, {
      withCredentials: true,
      headers,
    });
  }

  /***
   * Base http PUT request
   * @url string, request URL
   * @body any, request body
   * @headers object
   * @returns promise
   */
  put(url, body, headers) {
    return this.projectAxios.put(url, body, {
      withCredentials: true,
      headers,
    });
  }

  /***
   * Base http POST request
   * @url string, request URL
   * @headers object
   * @returns promise
   */
  del(url, headers) {
    return this.projectAxios.delete(url, {
      withCredentials: true,
      headers,
    });
  }
}
