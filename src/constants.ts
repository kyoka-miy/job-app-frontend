import {
  ActivityIcon,
  AssignmentIcon,
  CalendarIcon,
  CompanyIcon,
  FaceIcon,
  InfoIcon,
  JobIcon,
  MapIcon,
  MetricsIcon,
} from "./common/icons";
import { NoteIcon } from "./common/icons/NoteIcon";
import { colors } from "./common/styles";

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
  REJECTED: "Rejected",
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
  { text: "Assignments", icon: AssignmentIcon },
  { text: "Interviews", icon: FaceIcon },
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

interface InterviewTag {
  text: string;
  color: string;
  backgroundColor: string;
}

export const InterviewTags: Record<string, InterviewTag> = {
  PHONE_SCREEN: {
    text: "Phone Screen",
    color: colors.purple1,
    backgroundColor: colors.purple3,
  },
  FIRST_INTERVIEW: {
    text: "First Interview",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  SECOND_INTERVIEW: {
    text: "Second Interview",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  THIRD_INTERVIEW: {
    text: "Third Interview",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  FINAL_INTERVIEW: {
    text: "Final Interview",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  LEETCODE: {
    text: "Leetcode",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  LIVE_CODING: {
    text: "Live Coding",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  TECH_INTERVIEW: {
    text: "Tech Interview",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  HOMEWORK: {
    text: "Homework",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
  HR_INTERVIEW: {
    text: "HR Interview",
    color: colors.deepSlate,
    backgroundColor: colors.coolCharcoal,
  },
};
