import { CalendarIcon, JobIcon, MapIcon, MetricsIcon } from "./common/icons";

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
    JOB: `/job`,
    CALENDAR: `/calendar`,
    MAP: `/map`,
    METRICS: `/metrics`,
    PROFILE: `/profile`,
    BOARDS: `/boards`,
  },
};

interface HeaderMenuType {
  text: string;
  icon: any;
  path: string;
}

export const HeaderMenu: HeaderMenuType[] = [
  { text: "Job", icon: JobIcon, path: CONSTANTS.LINK.JOB },
  { text: "Calendar", icon: CalendarIcon, path: CONSTANTS.LINK.CALENDAR },
  { text: "Map", icon: MapIcon, path: CONSTANTS.LINK.MAP },
  { text: "Metrics", icon: MetricsIcon, path: CONSTANTS.LINK.METRICS },
];

export const JobStatus = {
  WISHLIST: "Wishlist",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
} as const;

export const WorkStyle = {
  REMOTE: "Remote",
  ON_SITE: "On-site",
  HYBRID: "Hybrid",
} as const;
