const endpointBase = process.env.REACT_APP_ENDPOINT_BASE;

export const CONSTANTS = {
  ENDPOINT: {
    REGISTER: `${endpointBase}/register`,
    CONFIRM: `${endpointBase}/confirm`,
    AUTHENTICATE: (mailAddress: string, password: string) =>
      `${endpointBase}/authenticate?mailAddress=${mailAddress}&password=${password}`,
    APPLICATION_ADD: (userId: number) =>
      `${endpointBase}/application/add/${userId}`,
    APPLICATION_GET: (userId: number) =>
      `${endpointBase}/application/${userId}`,
    APPLICATION_GET_BY_TEXT: (userId: number, text: string) =>
      `${endpointBase}/application/search/${userId}/${text}`,
    APPLICATION_GET_BY_STATUS: (userId: number) =>
      `${endpointBase}/application/${userId}`,
    APPLICATION_UPDATE: (applicationId: number) =>
      `${endpointBase}/application/update/${applicationId}`,
    APPLICATION_DELETE: (applicationId: number) =>
      `${endpointBase}/application/delete/${applicationId}`,
  },
};
