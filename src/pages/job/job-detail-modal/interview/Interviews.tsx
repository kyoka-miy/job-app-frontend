import { useState } from "react";
import styled from "styled-components";
import { Button, HStack, SmallText, VStack } from "../../../../common";
import { JobDto } from "../../../../api-interface/job";
import { InterviewDetailPanel } from "./InterviewDetailPanel";
import { useFetch } from "../../../../common/hooks";
import { CONSTANTS, InterviewTags } from "../../../../constants";
import { InterviewWithTagsDto } from "../../../../api-interface/Interview";
import { colors } from "../../../../common/styles";
import { format } from "date-fns";
import moment from "moment";

type Props = {
  selectedJob: JobDto;
};
export const Interviews = ({ selectedJob }: Props) => {
  const [showAddPanel, setShowAddPanel] = useState<boolean>(false);
  const [showInterviewDetailPanel, setShowInterviewDetailPanel] = useState<
    number | null
  >(null);
  const { data: interviews, refetch } = useFetch<InterviewWithTagsDto[]>({
    url: CONSTANTS.ENDPOINT.INTERVIEWS_JOB(selectedJob.jobId),
    shouldFetch: true,
  });
  return (
    <VStack gap={18}>
      <HStack justify="flex-end">
        <Button plusIcon bold onClick={() => setShowAddPanel(true)}>
          Add
        </Button>
      </HStack>
      {showAddPanel && (
        <InterviewDetailPanel
          setShowAddPanel={setShowAddPanel}
          selectedJob={selectedJob}
          refetchInterviews={refetch}
        />
      )}
      {interviews &&
        interviews.map((v, index) =>
          showInterviewDetailPanel !== index ? (
            <InterviewWrapper
              key={index}
              gap={12}
              completed={v.interview.completed}
              onClick={() => setShowInterviewDetailPanel(index)}
            >
              <SmallText bold>{v.interview.title}</SmallText>
              <HStack justify="space-between" width="100%">
                <VStack gap={12} width="80%">
                  <TagContainer gap={12}>
                    {v.tags.map((tag, index) => (
                      <TagWrapper
                        key={index}
                        color={InterviewTags[tag].color}
                        backgroundColor={InterviewTags[tag].backgroundColor}
                        selected={v.tags.includes(tag)}
                        completed={v.interview.completed}
                      >
                        <TagText
                          hoveredColor={InterviewTags[tag].color}
                          color={colors.grayText}
                          selected={v.tags.includes(tag)}
                          completed={v.interview.completed}
                        >
                          {InterviewTags[tag].text}
                        </TagText>
                      </TagWrapper>
                    ))}
                  </TagContainer>
                  {v.interview.note && (
                    <NoteContainer>
                      <SmallText>{v.interview.note}</SmallText>
                    </NoteContainer>
                  )}
                </VStack>
                <VStack align="flex-end" gap={4} width="20%">
                  <SmallText>
                    {format(v.interview.interviewDateTime, "yyyy/MM/dd")}
                  </SmallText>
                  <SmallText color={colors.grayText}>
                    {moment(v.interview.interviewDateTime).fromNow()}
                  </SmallText>
                </VStack>
              </HStack>
            </InterviewWrapper>
          ) : (
            <InterviewDetailPanel
              selectedJob={selectedJob}
              setShowInterviewDetailPanel={setShowInterviewDetailPanel}
              refetchInterviews={refetch}
              initInterview={v}
            />
          )
        )}
    </VStack>
  );
};

const InterviewWrapper = styled(VStack)<{ completed: boolean }>`
  padding: 26px 20px;
  border-radius: 8px;
  background-color: ${(p) => (p.completed ? colors.softSilver : colors.white)};
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);

  &:hover {
    cursor: pointer;
  }
`;

const TagContainer = styled(HStack)`
  flex-wrap: wrap;
  width: 100%;
`;

const TagWrapper = styled.div<{
  color: string;
  backgroundColor: string;
  selected: boolean;
  completed: boolean;
}>`
  border-radius: 100px;
  padding: 4px 10px;
  border: 1px solid ${colors.grayText};
  width: fit-content;

  &:hover {
    cursor: pointer;
    ${(p) => !p.completed && `border-color: ${p.color};`}
  }

  ${(p) =>
    p.selected &&
    !p.completed &&
    `background: ${p.backgroundColor}; border-color: ${p.color};`}
`;

const TagText = styled(SmallText)<{
  hoveredColor: string;
  selected: boolean;
  completed: boolean;
}>`
  ${TagWrapper}:hover & {
    ${(p) => !p.completed && `color: ${p.hoveredColor};`}
  }
  ${(p) => p.selected && !p.completed && `color: ${p.hoveredColor};`}
`;

const NoteContainer = styled.div`
  word-wrap: break-word;
  width: 85%;
`;
