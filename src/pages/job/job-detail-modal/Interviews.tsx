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
import { useState } from "react";
import { InterviewTags } from "../../../constants";

export const Interviews = () => {
  const [showAddPanel, setShowAddPanel] = useState<boolean>(false);
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
            <TextInput title="Title" required width="50%" />
            <SmallText>Select Tags</SmallText>
            <TagContainer gap={12}>
              {Object.keys(InterviewTags).map((key) => (
                <TagWrapper
                  key={key}
                  color={InterviewTags[key].color}
                  backgroundColor={InterviewTags[key].backgroundColor}
                >
                  <TagText
                    hoveredColor={InterviewTags[key].color}
                    color={colors.grayText}
                  >
                    {InterviewTags[key].text}
                  </TagText>
                </TagWrapper>
              ))}
            </TagContainer>
            <TextInput title="Date" type="date" required />
            <TextInput title="Note" type="textarea" />
            <CheckBox
              value="Mark as Completed"
              onChange={() => {}}
              checked={false}
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
const TagWrapper = styled.div<{ color: string; backgroundColor: string }>`
  border-radius: 100px;
  padding: 6px 12px;
  border: 1px solid ${colors.grayText};
  width: fit-content;

  &:hover {
    cursor: pointer;
    background: ${(p) => p.backgroundColor};
    border-color: ${(p) => p.color};
  }
`;
const TagText = styled(SmallText)<{ hoveredColor: string }>`
  ${TagWrapper}:hover & {
    color: ${(p) => p.hoveredColor};
  }
`;
