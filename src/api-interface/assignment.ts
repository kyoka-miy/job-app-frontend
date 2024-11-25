export type AssignmentDto = AddOrUpdateAssignmentRequest & {
    assignmentId: string;
    jobId: string;
}

export type AddOrUpdateAssignmentRequest = {
    title: string;
    deadlineDateTime: Date;
    note?: string;
    completed: boolean;
}