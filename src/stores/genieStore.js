import { createStore } from "zustand";
import Cookies from "js-cookie";
export const initialState = {
  genieTopics: [],
};

//store
const useGenieStore = createStore((set, get) => ({
  ...initialState,



  // getGenieTopics: async() => {
  //  const storedToken= Cookies.get('IdToken')
  //     if (!storedToken ) {
  //       //Redirect to login
  //     }
  //     console.log("store getGenieTopics");
  //     response = await getGenieTopics();
  //     set(state => ({
  //       genieTopics:[response.topics]
  //     })),
  //     console.log("getGenieTopics response:", response);

  // },
}));

export default useGenieStore;
