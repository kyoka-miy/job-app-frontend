import { useCallback, useMemo, useState } from "react";
import { JobDto } from "../../../../api-interface/job";
import styled from "styled-components";
import { colors } from "../../../../common/styles";
import {
  Button,
  CheckBox,
  DeletionConfirmModal,
  HStack,
  SmallText,
  TextInput,
  VStack,
} from "../../../../common";
import { ValidationUtil } from "../../../../common/utils/validation";
import { format, parse, setMilliseconds, setSeconds } from "date-fns";
import {
  AddOrUpdateAssignmentRequest,
  AssignmentDto,
} from "../../../../api-interface/assignment";
import { usePost } from "../../../../common/hooks";
import { CONSTANTS } from "../../../../constants";

type Props = {
  setShowAddPanel?: (v: boolean) => void;
  setShowAssignmentDetailPanel?: (v: number | null) => void;
  selectedJob: JobDto;
  initAssigment?: AssignmentDto;
  refetchAssignments: () => void;
};

export const AssignmentDetailPanel = ({
  setShowAddPanel,
  setShowAssignmentDetailPanel,
  selectedJob,
  initAssigment,
  refetchAssignments,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [assignmentData, setAssignmentData] =
    useState<AddOrUpdateAssignmentRequest>({
      title: initAssigment ? initAssigment.title : "",
      deadlineDateTime: initAssigment
        ? new Date(initAssigment.deadlineDateTime)
        : new Date(),
      note: initAssigment ? initAssigment.note : "",
      completed: initAssigment ? initAssigment.completed : false,
    });
  const initAssignmentData = useMemo(() => assignmentData, []);

  const { doPost: addAssignment } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS_JOB(selectedJob.jobId),
    onSuccess: () => {
      setErrorMessage("");
      setShowAddPanel && setShowAddPanel(false);
      refetchAssignments();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: updateInterview } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS(initAssigment?.assignmentId),
    method: "PUT",
    onSuccess: () => {
      setShowAssignmentDetailPanel && setShowAssignmentDetailPanel(null);
      refetchAssignments();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: deleteInterview } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS(initAssigment?.assignmentId),
    method: "DELETE",
    onSuccess: () => {
      setShowAssignmentDetailPanel && setShowAssignmentDetailPanel(null);
      refetchAssignments();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  const handleInputChange = useCallback(
    (value: string, key: keyof AddOrUpdateAssignmentRequest) => {
      setAssignmentData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setAssignmentData]
  );
  const handleCheckBoxChange = useCallback(
    () =>
      setAssignmentData((prev) => ({
        ...prev,
        completed: !prev.completed,
      })),
    [setAssignmentData]
  );
  const handleDateChange = useCallback(
    (date: string) => {
      let newDatetime = new Date();
      if (
        assignmentData.deadlineDateTime instanceof Date &&
        !isNaN(assignmentData.deadlineDateTime.getTime())
      ) {
        const time = format(assignmentData.deadlineDateTime, "HH:mm");
        newDatetime = parse(
          `${date}T${time}`,
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        );
      } else {
        const time = format(newDatetime, "HH:mm");
        newDatetime = parse(
          `${date}T${time}`,
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        );
      }
      setAssignmentData((prev) => ({
        ...prev,
        deadlineDateTime: newDatetime,
      }));
    },
    [assignmentData.deadlineDateTime]
  );
  const handleTimeChange = useCallback(
    (time: string) => {
      const date =
        assignmentData.deadlineDateTime instanceof Date &&
        !isNaN(assignmentData.deadlineDateTime.getTime())
          ? format(assignmentData.deadlineDateTime, "yyyy-MM-dd")
          : "";
      let newDatetime = parse(
        `${date}T${time}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      );
      newDatetime = setSeconds(setMilliseconds(newDatetime, 0), 0);
      setAssignmentData((prev) => ({
        ...prev,
        deadlineDateTime: newDatetime,
      }));
    },
    [assignmentData.deadlineDateTime]
  );
  return (
    <InterviewWrapper>
      <VStack gap={14}>
        <TextInput
          title="Title"
          required
          width="50%"
          value={assignmentData.title}
          onChange={(v) => handleInputChange(v, "title")}
          validate={(v) => ValidationUtil.require(v)}
        />
        <HStack gap={12} width="50%">
          <TextInput
            title="Date"
            type="date"
            required
            value={
              assignmentData.deadlineDateTime instanceof Date &&
              !isNaN(assignmentData.deadlineDateTime.getTime())
                ? format(assignmentData.deadlineDateTime, "yyyy-MM-dd")
                : ""
            }
            onChange={(v) => handleDateChange(v)}
            validate={(v) => ValidationUtil.require(v)}
          />
          <TextInput
            title="Time"
            type="time"
            required
            value={
              assignmentData.deadlineDateTime instanceof Date &&
              !isNaN(assignmentData.deadlineDateTime.getTime())
                ? format(assignmentData.deadlineDateTime, "HH:mm")
                : ""
            }
            onChange={(v) => handleTimeChange(v)}
            validate={(v) => ValidationUtil.require(v)}
          />
        </HStack>
        <TextInput
          title="Note"
          type="textarea"
          value={assignmentData.note}
          onChange={(v) => handleInputChange(v, "note")}
        />
        <CheckBox
          value="Mark as Completed"
          onChange={() => handleCheckBoxChange()}
          checked={assignmentData.completed}
        />
        {errorMessage && (
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        )}
        <HStack gap={8} justify="flex-end">
          {!initAssigment && (
            <Button
              onClick={() => addAssignment(assignmentData)}
              disabled={
                !(
                  ValidationUtil.require(assignmentData.title) &&
                  assignmentData.deadlineDateTime instanceof Date &&
                  !isNaN(assignmentData.deadlineDateTime.getTime())
                )
              }
            >
              Create
            </Button>
          )}
          {initAssigment && assignmentData !== initAssignmentData && (
            <Button
              onClick={() => updateInterview(assignmentData)}
              disabled={
                !(
                  ValidationUtil.require(assignmentData.title) &&
                  assignmentData.deadlineDateTime instanceof Date &&
                  !isNaN(assignmentData.deadlineDateTime.getTime())
                )
              }
            >
              Save
            </Button>
          )}
          {initAssigment && (
            <Button onClick={() => setShowConfirmModal(true)} type="secondary">
              Delete
            </Button>
          )}
          <Button
            type="secondary"
            onClick={() => {
              setShowAssignmentDetailPanel && setShowAssignmentDetailPanel(null);
              setShowAddPanel && setShowAddPanel(false);
            }}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
      {showConfirmModal && (
        <DeletionConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onDelete={() => deleteInterview()}
        />
      )}
    </InterviewWrapper>
  );
};

const InterviewWrapper = styled.div`
  padding: 26px 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);
`;
