const endpointBase = process.env.REACT_APP_ENDPOINT_BASE;

export const CONSTANTS = {
    ENDPOINT: {
        AUTH_REGISTER: `${endpointBase}/auth/register`,
    },
    LINK: {
        SIGN_UP: `/sign-up`,
        LOGIN: `/login`
    }
}