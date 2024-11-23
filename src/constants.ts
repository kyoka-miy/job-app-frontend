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
    INTERVIEWS: (interviewId?: string) =>
      `${endpointBase}/interviews/${interviewId}`,
    INTERVIEWS_JOB: (jobId: string) =>
      `${endpointBase}/interviews/jobs/${jobId}`,
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
    color: "#FF5733",
    backgroundColor: "#FFE5D9",
  },
  FIRST_INTERVIEW: {
    text: "First Interview",
    color: "#D7266B",
    backgroundColor: "#F5DCE6",
  },
  SECOND_INTERVIEW: {
    text: "Second Interview",
    color: "#39D353",
    backgroundColor: "#E6F7E6",
  },
  THIRD_INTERVIEW: {
    text: "Third Interview",
    color: "#396BFF",
    backgroundColor: "#DDE8FF",
  },
  FINAL_INTERVIEW: {
    text: "Final Interview",
    color: "#008080",
    backgroundColor: "#D1F0EF",
  },
  LEETCODE: {
    text: "Leetcode",
    color: "#8C1EFF",
    backgroundColor: "#EADDF7",
  },
  LIVE_CODING: {
    text: "Live Coding",
    color: "#FF4D9D",
    backgroundColor: "#FDE3EF",
  },
  TECH_INTERVIEW: {
    text: "Tech Interview",
    color: "#FFD700",
    backgroundColor: "#FFF8DC",
  },
  HOMEWORK: {
    text: "Homework",
    color: "#FF6B6B",
    backgroundColor: "#FFEDED",
  },
  HR_INTERVIEW: {
    text: "HR Interview",
    color: "#00E5FF",
    backgroundColor: "#DFF8FF",
  },
};
