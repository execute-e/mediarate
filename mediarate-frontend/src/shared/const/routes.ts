export const ROUTES = {
  home: () => "/",

  // * api (relative to nextApi's "/api" base url)
  apiRegister: () => "/auth/register",
  apiLogin: () => "/auth/login",
  apiLogout: () => "/auth/logout",
  apiRefresh: () => "/auth/refresh",

  auth: () => "/auth",
};