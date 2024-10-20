const endpointBase = process.env.REACT_APP_ENDPOINT_BASE;
export const CONSTANTS = {
  ENDPOINT: {
    AUTH_REGISTER: `${endpointBase}/auth/register`,
    AUTH_LOGIN: `${endpointBase}/auth/login`,
    LOGOUT: `${endpointBase}/account-logout`,
    BOARDS: `${endpointBase}/boards`,
  },
  LINK: {
    SIGN_UP: `/sign-up`,
    LOGIN: `/login`,
    BOARD_SELECT: `/board-select`,
  },
};
