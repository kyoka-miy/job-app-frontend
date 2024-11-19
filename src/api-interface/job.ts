import { WorkStyle, JobStatus } from "../constants";

export type JobDto = {
  jobId: string;
  jobTitle: string;
  companyName: string;
  url?: string;
  location?: string;
  salary?: string;
  workStyle?: keyof typeof WorkStyle;
  status: keyof typeof JobStatus;
  appliedDate?: Date;
  jobBoard?: string;
  note?: string;
  boardId: string;
  addedDatetime: Date;
};

export type AddOrUpdateJobRequest = {
  jobTitle: string;
  companyName: string;
  url?: string;
  location?: string;
  placeId?: string;
  salary?: string;
  workStyle?: keyof typeof WorkStyle;
  status: keyof typeof JobStatus;
  appliedDate?: Date;
  jobBoard?: string;
  note?: string;
};
