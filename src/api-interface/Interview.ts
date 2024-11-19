export type AddOrUpdateInterviewRequest = {
  title: string;
  tags?: string[];
  interviewDateTime: Date;
  note?: string;
  completed: boolean;
};

export type InterviewDto = {
  interviewId: string;
  title: string;
  interviewDateTime: Date;
  note: string;
  completed: boolean;
  jobId: string;
  activityId: string;
}

export type InterviewWithTagsDto = {
  interview: InterviewDto;
  tags: string[];
}