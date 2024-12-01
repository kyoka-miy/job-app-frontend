export type ActivityDto = AddOrUpdateActivityRequest & {
  activityId: string;
  jobId: string;
};

export type AddOrUpdateActivityRequest = {
  name: string;
  activityDateTime: Date;
  deleted: boolean;
};
