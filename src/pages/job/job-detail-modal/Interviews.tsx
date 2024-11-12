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
import { InterviewTags } from "../../../constants";
import { AddOrUpdateInterviewRequest } from "../../../api-interface/Interview";
import { format } from "date-fns";

export const Interviews = () => {
  const [showAddPanel, setShowAddPanel] = useState<boolean>(false);
  const [interviewData, setInterviewData] =
    useState<AddOrUpdateInterviewRequest>({
      title: "",
      tags: [],
      interviewDatetime: new Date(),
      note: "",
      completed: false,
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
              [key]: [...prev.tags, value],
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
            <TextInput
              title="Date"
              type="date"
              required
              value={format(interviewData.interviewDatetime, "yyyy-MM-dd")}
              onChange={(v) => handleInputChange(v, "interviewDatetime")}
            />
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
            <HStack gap={8} justify="flex-end">
              <Button>Create</Button>
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
  width: 60%;
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
    background: ${(p) => p.backgroundColor};
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
