import { useCallback, useMemo, useState } from "react";
import {
  ActivityDto,
  AddOrUpdateActivityRequest,
} from "../../../../api-interface/activity";
import { JobDto } from "../../../../api-interface/job";
import { usePost } from "../../../../common/hooks";
import { CONSTANTS } from "../../../../constants";
import { format, parse, setMilliseconds, setSeconds } from "date-fns";
import styled from "styled-components";
import { colors } from "../../../../common/styles";
import {
  Button,
  DeletionConfirmModal,
  HStack,
  SmallText,
  TextInput,
  VStack,
} from "../../../../common";
import { ValidationUtil } from "../../../../common/utils/validation";

type Props = {
  setShowAddPanel?: (v: boolean) => void;
  setShowDetailPanel?: (v: number | null) => void;
  selectedJob: JobDto;
  initActivity?: ActivityDto;
  refetchActivities: () => void;
};

export const ActivityDetailPanel = ({
  setShowAddPanel,
  setShowDetailPanel,
  selectedJob,
  initActivity,
  refetchActivities,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [activityData, setActivityData] = useState<AddOrUpdateActivityRequest>({
    name: initActivity ? initActivity.name : "",
    activityDateTime: initActivity
      ? new Date(initActivity.activityDateTime)
      : new Date(),
    deleted: initActivity ? initActivity.deleted : false,
  });
  const initAssignmentData = useMemo(() => activityData, []);

  const { doPost: addActivity } = usePost({
    url: CONSTANTS.ENDPOINT.ACTIVITIES_JOB(selectedJob.jobId),
    onSuccess: () => {
      setErrorMessage("");
      setShowAddPanel && setShowAddPanel(false);
      refetchActivities();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: updateActivity } = usePost({
    url: CONSTANTS.ENDPOINT.ACTIVITIES(initActivity?.activityId),
    method: "PUT",
    onSuccess: () => {
      setShowDetailPanel && setShowDetailPanel(null);
      refetchActivities();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: deleteActivity } = usePost({
    url: CONSTANTS.ENDPOINT.ACTIVITIES(initActivity?.activityId),
    method: "DELETE",
    onSuccess: () => {
      setShowDetailPanel && setShowDetailPanel(null);
      refetchActivities();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  const handleInputChange = useCallback(
    (value: string, key: keyof AddOrUpdateActivityRequest) => {
      setActivityData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setActivityData]
  );

  const handleDateChange = useCallback(
    (date: string) => {
      let newDatetime = new Date();
      if (
        activityData.activityDateTime instanceof Date &&
        !isNaN(activityData.activityDateTime.getTime())
      ) {
        const time = format(activityData.activityDateTime, "HH:mm");
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
      setActivityData((prev) => ({
        ...prev,
        activityDateTime: newDatetime,
      }));
    },
    [activityData.activityDateTime]
  );
  const handleTimeChange = useCallback(
    (time: string) => {
      const date =
        activityData.activityDateTime instanceof Date &&
        !isNaN(activityData.activityDateTime.getTime())
          ? format(activityData.activityDateTime, "yyyy-MM-dd")
          : "";
      let newDatetime = parse(
        `${date}T${time}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      );
      newDatetime = setSeconds(setMilliseconds(newDatetime, 0), 0);
      setActivityData((prev) => ({
        ...prev,
        activityDateTime: newDatetime,
      }));
    },
    [activityData.activityDateTime]
  );
  return (
    <ActivityWrapper>
      <VStack gap={14}>
        <TextInput
          title="Title"
          required
          width="50%"
          value={activityData.name}
          onChange={(v) => handleInputChange(v, "name")}
          validate={(v) => ValidationUtil.require(v)}
        />
        <HStack gap={12} width="50%">
          <TextInput
            title="Date"
            type="date"
            required
            value={
              activityData.activityDateTime instanceof Date &&
              !isNaN(activityData.activityDateTime.getTime())
                ? format(activityData.activityDateTime, "yyyy-MM-dd")
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
              activityData.activityDateTime instanceof Date &&
              !isNaN(activityData.activityDateTime.getTime())
                ? format(activityData.activityDateTime, "HH:mm")
                : ""
            }
            onChange={(v) => handleTimeChange(v)}
            validate={(v) => ValidationUtil.require(v)}
          />
        </HStack>

        {errorMessage && (
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        )}
        <HStack gap={8} justify="flex-end">
          {!initActivity && (
            <Button
              onClick={() =>
                addActivity({
                  name: activityData.name,
                  activityDateTime: activityData.activityDateTime,
                })
              }
              disabled={
                !(
                  ValidationUtil.require(activityData.name) &&
                  activityData.activityDateTime instanceof Date &&
                  !isNaN(activityData.activityDateTime.getTime())
                )
              }
            >
              Create
            </Button>
          )}
          {initActivity && activityData !== initAssignmentData && (
            <Button
              onClick={() => updateActivity(activityData)}
              disabled={
                !(
                  ValidationUtil.require(activityData.name) &&
                  activityData.activityDateTime instanceof Date &&
                  !isNaN(activityData.activityDateTime.getTime())
                )
              }
            >
              Save
            </Button>
          )}
          {initActivity && (
            <Button onClick={() => setShowConfirmModal(true)} type="secondary">
              Delete
            </Button>
          )}
          <Button
            type="secondary"
            onClick={() => {
              setShowDetailPanel && setShowDetailPanel(null);
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
          onDelete={() => deleteActivity()}
        />
      )}
    </ActivityWrapper>
  );
};

const ActivityWrapper = styled.div`
  padding: 26px 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);
`;
