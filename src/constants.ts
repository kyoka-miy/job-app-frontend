import { ActivityIcon, CalendarIcon, CompanyIcon, InfoIcon, JobIcon, MapIcon, MetricsIcon } from "./common/icons";
import { NoteIcon } from "./common/icons/NoteIcon";

const endpointBase = process.env.REACT_APP_ENDPOINT_BASE;
export const CONSTANTS = {
  ENDPOINT: {
    AUTH_REGISTER: `${endpointBase}/auth/register`,
    AUTH_LOGIN: `${endpointBase}/auth/login`,
    LOGOUT: `${endpointBase}/account-logout`,
    BOARDS: `${endpointBase}/boards`,
    JOBS: `${endpointBase}/jobs`,
    JOB_UPDATE: (jobId: string) => `${endpointBase}/jobs/${jobId}`,
    PLACES: `${endpointBase}/places`,
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

export const JobDetailMenu = [
  { text: "Info", icon: InfoIcon },
  { text: "Activities", icon: ActivityIcon },
  { text: "Notes", icon: NoteIcon },
  { text: "Company", icon: CompanyIcon },
];

export const settings = [
  { key: "Profile", value: "Profile" },
  { key: "Boards", value: "Boards" },
  { key: "Log out", value: "Log out" },
];

export const statusOptions = (
  Object.keys(JobStatus) as Array<keyof typeof JobStatus>
).map((key) => ({
  name: key,
  value: JobStatus[key],
}));