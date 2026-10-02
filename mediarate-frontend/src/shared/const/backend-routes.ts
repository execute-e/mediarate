export const BACKEND_ROUTES = {
  // * auth
  register: () => "auth/register",
  login: () => "auth/login",
  logout: () => "auth/logout",
  refresh: () => "auth/refresh",

  // * user
  getMe: () => "user/profile",
  profile: (username: string) => `user/profile/${username}`,
  updateAvatar: () => "user/avatar",
  updateBanner: () => "user/banner",
};
