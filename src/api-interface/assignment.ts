export type AssignmentDto = AddOrUpdateAssignmentRequest & {
  assignmentId: string;
  jobId: string;
};

export type AddOrUpdateAssignmentRequest = {
  title: string;
  deadlineDatetime: Date;
  note?: string;
  completed: boolean;
};
