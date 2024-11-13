export type AddOrUpdateInterviewRequest = {
  title: string;
  tags?: string[];
  interviewDatetime: Date;
  note?: string;
  completed: boolean;
};
