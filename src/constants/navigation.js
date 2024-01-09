import { USERS_ROLES } from "./users";

export const PATHS_NAMES = {
  EMPTY: "/",
  LOGINUSER: "/loginuser",
  LOGINGENIE: "/logingenie",
  // REGISTER: "/register",
  USERCHAT: "/userchat",
  MAIN: "/user",
  USER: "/user",
  GENIE: "/genie",
  GENIECHATS: "/geniechats",
  ERROR: "/error",

  USERNEWCHAT: "/usernewchat",
  GENIETOPICS: "/genietopics",
  CONVERSATION: "/post",
};

export const HOME_PATH_BY_ROLE = {
  [USERS_ROLES.USERCHAT]: PATHS_NAMES.USERCHAT,
};
