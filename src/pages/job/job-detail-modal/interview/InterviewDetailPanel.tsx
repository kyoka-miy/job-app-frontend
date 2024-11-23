import { useCallback, useMemo, useState } from "react";
import { CONSTANTS, InterviewTags } from "../../../../constants";
import {
  AddOrUpdateInterviewRequest,
  InterviewWithTagsDto,
} from "../../../../api-interface/Interview";
import { format, parse, setMilliseconds, setSeconds } from "date-fns";
import { usePost } from "../../../../common/hooks";
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
import { colors } from "../../../../common/styles";
import styled from "styled-components";
import { JobDto } from "../../../../api-interface/job";

type Props = {
  setShowAddPanel?: (v: boolean) => void;
  setShowInterviewDetailPanel?: (v: number | null) => void;
  selectedJob: JobDto;
  refetchInterviews: () => void;
  initInterview?: InterviewWithTagsDto;
};

export const InterviewDetailPanel = ({
  setShowAddPanel,
  setShowInterviewDetailPanel,
  selectedJob,
  refetchInterviews,
  initInterview,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [interviewData, setInterviewData] =
    useState<AddOrUpdateInterviewRequest>({
      title: initInterview ? initInterview.interview.title : "",
      tags: initInterview ? initInterview.tags : undefined,
      interviewDateTime: initInterview
        ? new Date(initInterview.interview.interviewDateTime)
        : new Date(),
      note: initInterview ? initInterview.interview.note : "",
      completed: initInterview ? initInterview.interview.completed : false,
    });
  const initInterviewData = useMemo(() => interviewData, []);

  const { doPost } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS_JOB(selectedJob.jobId),
    onSuccess: () => {
      setErrorMessage("");
      setShowAddPanel && setShowAddPanel(false);
      refetchInterviews();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: updateInterview } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS(initInterview?.interview.interviewId),
    method: "PUT",
    onSuccess: () => {
      setShowInterviewDetailPanel && setShowInterviewDetailPanel(null);
      refetchInterviews();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  const handleInputChange = useCallback(
    (value: string, key: keyof AddOrUpdateInterviewRequest) => {
      if (key === "tags") {
        setInterviewData((prev) => {
          if (prev.tags?.includes(value))
            return {
              ...prev,
              [key]: prev.tags.filter((v) => v !== value),
            };
          else
            return {
              ...prev,
              [key]: [...(prev.tags || []), value],
            };
        });
      } else
        setInterviewData((prev) => ({
          ...prev,
          [key]: value,
        }));
    },
    [setInterviewData]
  );
  const handleCheckBoxChange = useCallback(
    () =>
      setInterviewData((prev) => ({
        ...prev,
        completed: !prev.completed,
      })),
    [setInterviewData]
  );
  const handleDateChange = useCallback(
    (date: string) => {
      let newDatetime = new Date();
      if (
        interviewData.interviewDateTime instanceof Date &&
        !isNaN(interviewData.interviewDateTime.getTime())
      ) {
        const time = format(interviewData.interviewDateTime, "HH:mm");
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
      setInterviewData((prev) => ({
        ...prev,
        interviewDateTime: newDatetime,
      }));
    },
    [interviewData.interviewDateTime]
  );
  const handleTimeChange = useCallback(
    (time: string) => {
      const date =
        interviewData.interviewDateTime instanceof Date &&
        !isNaN(interviewData.interviewDateTime.getTime())
          ? format(interviewData.interviewDateTime, "yyyy-MM-dd")
          : "";
      let newDatetime = parse(
        `${date}T${time}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      );
      newDatetime = setSeconds(setMilliseconds(newDatetime, 0), 0);
      setInterviewData((prev) => ({
        ...prev,
        interviewDateTime: newDatetime,
      }));
    },
    [interviewData.interviewDateTime]
  );
  const onDeleteInterview = useCallback(() => {}, []);
  return (
    <InterviewWrapper>
      <VStack gap={14}>
        <TextInput
          title="Title"
          required
          width="50%"
          value={interviewData.title}
          onChange={(v) => handleInputChange(v, "title")}
          validate={(v) => ValidationUtil.require(v)}
        />
        <SmallText>Select Tags</SmallText>
        <TagContainer gap={12}>
          {Object.keys(InterviewTags).map((key) => (
            <TagWrapper
              key={key}
              color={InterviewTags[key].color}
              backgroundColor={InterviewTags[key].backgroundColor}
              selected={interviewData.tags?.includes(key) || false}
              onClick={() => handleInputChange(key, "tags")}
            >
              <TagText
                hoveredColor={InterviewTags[key].color}
                color={colors.grayText}
                selected={interviewData.tags?.includes(key) || false}
              >
                {InterviewTags[key].text}
              </TagText>
            </TagWrapper>
          ))}
        </TagContainer>
        <HStack gap={12} width="50%">
          <TextInput
            title="Date"
            type="date"
            required
            value={
              interviewData.interviewDateTime instanceof Date &&
              !isNaN(interviewData.interviewDateTime.getTime())
                ? format(interviewData.interviewDateTime, "yyyy-MM-dd")
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
              interviewData.interviewDateTime instanceof Date &&
              !isNaN(interviewData.interviewDateTime.getTime())
                ? format(interviewData.interviewDateTime, "HH:mm")
                : ""
            }
            onChange={(v) => handleTimeChange(v)}
            validate={(v) => ValidationUtil.require(v)}
          />
        </HStack>
        <TextInput
          title="Note"
          type="textarea"
          value={interviewData.note}
          onChange={(v) => handleInputChange(v, "note")}
        />
        <CheckBox
          value="Mark as Completed"
          onChange={() => handleCheckBoxChange()}
          checked={interviewData.completed}
        />
        {errorMessage && (
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        )}
        <HStack gap={8} justify="flex-end">
          {!initInterview && (
            <Button
              onClick={() => doPost(interviewData)}
              disabled={
                !(
                  ValidationUtil.require(interviewData.title) &&
                  interviewData.interviewDateTime instanceof Date &&
                  !isNaN(interviewData.interviewDateTime.getTime())
                )
              }
            >
              Create
            </Button>
          )}
          {initInterview && interviewData !== initInterviewData && (
            <Button
              onClick={() => updateInterview(interviewData)}
              disabled={
                !(
                  ValidationUtil.require(interviewData.title) &&
                  interviewData.interviewDateTime instanceof Date &&
                  !isNaN(interviewData.interviewDateTime.getTime())
                )
              }
            >
              Save
            </Button>
          )}
          {initInterview && (
            <Button onClick={() => setShowConfirmModal(true)} type="secondary">
              Delete
            </Button>
          )}
          <Button
            type="secondary"
            onClick={() =>
              setShowInterviewDetailPanel
                ? setShowInterviewDetailPanel(null)
                : setShowAddPanel && setShowAddPanel(false)
            }
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
      {showConfirmModal && (
        <DeletionConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onDelete={() => onDeleteInterview()}
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

const TagContainer = styled(HStack)`
  flex-wrap: wrap;
  width: 80%;
`;
export const TagWrapper = styled.div<{
  color: string;
  backgroundColor: string;
  selected: boolean;
}>`
  border-radius: 100px;
  padding: 6px 12px;
  border: 1px solid ${colors.grayText};
  width: fit-content;

  &:hover {
    cursor: pointer;
    border-color: ${(p) => p.color};
  }

  ${(p) =>
    p.selected && `background: ${p.backgroundColor}; border-color: ${p.color};`}
`;
export const TagText = styled(SmallText)<{
  hoveredColor: string;
  selected: boolean;
}>`
  ${TagWrapper}:hover & {
    color: ${(p) => p.hoveredColor};
  }
  ${(p) => p.selected && `color: ${p.hoveredColor};`}
`;
