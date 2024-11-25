import { useState, useCallback } from "react";
import styled from "styled-components";
import {
  Button,
  CheckBox,
  HStack,
  SmallText,
  TextInput,
  VStack,
} from "../../../common";
import { colors } from "../../../common/styles";
import { CONSTANTS, InterviewTags } from "../../../constants";
import { format, parse, setMilliseconds, setSeconds } from "date-fns";
import { usePost } from "../../../common/hooks";
import { JobDto } from "../../../api-interface/job";
import { ValidationUtil } from "../../../common/utils/validation";
import { AddOrUpdateInterviewRequest } from "../../../api-interface/Interview";

type Props = {
  selectedJob: JobDto;
};
export const Interviews = ({ selectedJob }: Props) => {
  const [showAddPanel, setShowAddPanel] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [interviewData, setInterviewData] =
    useState<AddOrUpdateInterviewRequest>({
      title: "",
      tags: undefined,
      interviewDateTime: new Date(),
      note: "",
      completed: false,
    });

  const { doPost } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS_JOB(selectedJob.jobId),
    onSuccess: () => {
      setShowAddPanel(false);
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

  return (
    <VStack gap={18}>
      <HStack justify="flex-end">
        <Button plusIcon bold onClick={() => setShowAddPanel(true)}>
          Add
        </Button>
      </HStack>
      {showAddPanel && (
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
              <Button type="secondary" onClick={() => setShowAddPanel(false)}>
                Cancel
              </Button>
            </HStack>
          </VStack>
        </InterviewWrapper>
      )}
    </VStack>
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
const TagWrapper = styled.div<{
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
const TagText = styled(SmallText)<{ hoveredColor: string; selected: boolean }>`
  ${TagWrapper}:hover & {
    color: ${(p) => p.hoveredColor};
  }
  ${(p) => p.selected && `color: ${p.hoveredColor};`}
`;
