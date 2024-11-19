import { useState } from "react";
import styled from "styled-components";
import { Button, HStack, SmallText, VStack } from "../../../../common";
import { JobDto } from "../../../../api-interface/job";
import {
  InterviewAddPanel,
  TagContainer,
  TagText,
  TagWrapper,
} from "./InterviewAddPanel";
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
  const { data: interviews } = useFetch<InterviewWithTagsDto[]>({
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
        <InterviewAddPanel
          setShowAddPanel={setShowAddPanel}
          selectedJob={selectedJob}
        />
      )}
      {interviews &&
        interviews.map((v) => (
          <InterviewWrapper gap={8}>
            <SmallText bold>{v.interview.title}</SmallText>
            <HStack gap={8} justify="space-between">
              <VStack>
                <TagContainer gap={12}>
                  {v.tags.map((tag, index) => (
                    <TagWrapper
                      key={index}
                      color={InterviewTags[tag].color}
                      backgroundColor={InterviewTags[tag].backgroundColor}
                      selected={v.tags.includes(tag)}
                    >
                      <TagText
                        hoveredColor={InterviewTags[tag].color}
                        color={colors.grayText}
                        selected={v.tags.includes(tag)}
                      >
                        {InterviewTags[tag].text}
                      </TagText>
                    </TagWrapper>
                  ))}
                </TagContainer>
                {v.interview.note && <SmallText>{v.interview.note}</SmallText>}
              </VStack>
              <VStack align="flex-end">
                <SmallText>
                  {format(v.interview.interviewDateTime, "yyyy/MM/dd")}
                </SmallText>
                <SmallText>
                  in {moment(v.interview.interviewDateTime).fromNow()}
                </SmallText>
              </VStack>
            </HStack>
          </InterviewWrapper>
        ))}
    </VStack>
  );
};

const InterviewWrapper = styled(VStack)`
  padding: 26px 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);
`;
