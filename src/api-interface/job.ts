import { WorkStyle, JobStatus } from "../constants";
import { AssignmentDto } from "./assignment";
import { InterviewWithTagsDto } from "./Interview";

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

export type JobWithInterviewDto = InterviewWithTagsDto & {
  job: JobDto;
};

export type JobWithAssignmentDto = {
  job: JobDto;
  assignment: AssignmentDto;
};
