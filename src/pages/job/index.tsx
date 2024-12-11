import styled from "styled-components";
import {
  Button,
  HStack,
  MediumText,
  Modal,
  SmallText,
  Tab,
  VStack,
  WhitePanel,
} from "../../common";
import { ArrowIcon } from "../../common/icons";
import { CONSTANTS, InterviewTags, JobStatus } from "../../constants";
import { useEffect, useState } from "react";
import {
  JobDto,
  JobWithAssignmentDto,
  JobWithInterviewDto,
} from "../../api-interface/job";
import { useFetch } from "../../common/hooks";
import { colors } from "../../common/styles";
import moment from "moment";
import { JobDetailModal } from "./job-detail-modal/JobDetailModal";
import { JobInfo } from "./job-detail-modal/info/JobInfo";
import { format } from "date-fns";

export const Job = () => {
  const [status, setStatus] = useState<keyof typeof JobStatus>("WISHLIST");
  const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { data, refetch } = useFetch<JobDto[]>({
    url: CONSTANTS.ENDPOINT.JOBS,
    params: {
      status: status,
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  useEffect(() => {
    refetch();
  }, [status]);

  const { data: JobWithInterview } = useFetch<JobWithInterviewDto[]>({
    url: CONSTANTS.ENDPOINT.JOBS_INTERVIEWS,
    onError: (err) => {
      setErrorMessage(err);
    },
    shouldFetch: true,
  });

  const { data: JobWithAssignment } = useFetch<JobWithAssignmentDto[]>({
    url: CONSTANTS.ENDPOINT.JOBS_ASSIGNMENTS,
    onError: (err) => {
      setErrorMessage(err);
    },
    shouldFetch: true,
  });

  return (
    <VStack gap={20}>
      <HStack justify="space-between">
        <HStack>
          {(Object.keys(JobStatus) as Array<keyof typeof JobStatus>).map(
            (v) => (
              <HStack align="center" gap={6} key={v}>
                <Tab
                  onClick={() => setStatus(v)}
                  selected={status === v}
                  color={v === "REJECTED" ? colors.grayText : colors.deepSlate}
                >
                  {JobStatus[v]}
                </Tab>
                {v !== "OFFER" && v !== "REJECTED" && <ArrowIcon />}
              </HStack>
            )
          )}
        </HStack>
        <Button onClick={() => setShowAddJobModal(true)} bold plusIcon>
          Add Job
        </Button>
      </HStack>
      {errorMessage && (
        <SmallText color={colors.purple3}>{errorMessage}</SmallText>
      )}
      {status === "INTERVIEW" &&
        JobWithInterview &&
        JobWithInterview.length > 0 && (
          <UpcomingBackground gap={16} color="#d1f0ef">
            <MediumText bold color="#008080">
              Upcoming Interviews
            </MediumText>
            <InterviewList>
              {JobWithInterview.map((v, index) => (
                <InterviewWrapper
                  key={index}
                  gap={10}
                  onClick={() => setSelectedJob(v.job)}
                >
                  <VStack gap={10}>
                    <HStack>
                      <VStack gap={3}>
                        <SmallText bold>{v.job.companyName}</SmallText>
                        <SmallText>{v.job.jobTitle}</SmallText>
                      </VStack>
                      <VStack align="flex-end" gap={3}>
                        <SmallText>
                          {format(v.interview.interviewDateTime, "yyyy/MM/dd")}
                        </SmallText>
                        <SmallText color={colors.grayText}>
                          {moment(v.interview.interviewDateTime).fromNow()}
                        </SmallText>
                      </VStack>
                    </HStack>
                    <SmallText>{v.interview.title}</SmallText>
                    <VStack gap={10}>
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
                  </VStack>
                </InterviewWrapper>
              ))}
            </InterviewList>
          </UpcomingBackground>
        )}
      {(status === "INTERVIEW" || status === "APPLIED") &&
        JobWithAssignment &&
        JobWithAssignment.length > 0 && (
          <UpcomingBackground gap={16} color="#FFE5D9">
            <MediumText bold color="#FF5733">
              Upcoming Assignments
            </MediumText>
            <InterviewList>
              {JobWithAssignment.map((v, index) => (
                <InterviewWrapper
                  key={index}
                  gap={10}
                  onClick={() => setSelectedJob(v.job)}
                >
                  <VStack gap={8}>
                    <HStack>
                      <VStack gap={3}>
                        <SmallText bold>{v.job.companyName}</SmallText>
                        <SmallText>{v.job.jobTitle}</SmallText>
                      </VStack>
                      <VStack align="flex-end" gap={3}>
                        <SmallText>
                          {format(v.assignment.deadlineDatetime, "yyyy/MM/dd")}
                        </SmallText>
                        <SmallText color={colors.grayText}>
                          {moment(v.assignment.deadlineDatetime).fromNow()}
                        </SmallText>
                      </VStack>
                    </HStack>
                    <SmallText>{v.assignment.title}</SmallText>
                    {v.assignment.note && (
                      <NoteContainer>
                        <SmallText>{v.assignment.note}</SmallText>
                      </NoteContainer>
                    )}
                  </VStack>
                </InterviewWrapper>
              ))}
            </InterviewList>
          </UpcomingBackground>
        )}
      <JobList>
        {data?.map((job, index) => (
          <StyledWhitePanel key={index} onClick={() => setSelectedJob(job)}>
            <VStack gap={16}>
              <VStack gap={4}>
                <SmallText>{job.companyName}</SmallText>
                <SmallText color={colors.grayText}>{job.jobTitle}</SmallText>
              </VStack>
              <VStack align="right">
                <StyledSmallText color={colors.grayText}>
                  {moment(job.addedDatetime).fromNow()}
                </StyledSmallText>
              </VStack>
            </VStack>
          </StyledWhitePanel>
        ))}
      </JobList>
      {showAddJobModal && (
        <Modal
          onClose={() => setShowAddJobModal(false)}
          width="85%"
          innerWidth="85%"
        >
          <JobInfo />
        </Modal>
      )}
      {selectedJob && (
        <JobDetailModal
          onClose={() => setSelectedJob(null)}
          selectedJob={selectedJob}
        />
      )}
    </VStack>
  );
};

const JobList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
  padding: 8px;
`;

const StyledWhitePanel = styled(WhitePanel)`
  width: calc((100% - 120px) / 4);
  margin-bottom: 40px;
  &:nth-child(4n) {
    margin-right: 0;
  }

  &:not(:nth-child(4n)) {
    margin-right: 40px;
  }
`;

const StyledSmallText = styled(SmallText)`
  font-size: 12px;
`;

const UpcomingBackground = styled(VStack)<{ color: string }>`
  background-color: ${(p) => p.color};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 4px rgba(50, 50, 50, 0.3);
`;

const InterviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const InterviewWrapper = styled(VStack)`
  padding: 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 4px rgba(50, 50, 50, 0.3);
  width: calc((100% - 40px) / 3);

  margin-bottom: 20px;
  &:nth-child(3n) {
    margin-right: 0;
  }

  &:not(:nth-child(3n)) {
    margin-right: 20px;
  }
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
  padding: 0 5px;
  height: 22px;
  border: 1px solid ${colors.grayText};
  width: fit-content;
  ${(p) => `background: ${p.backgroundColor}; border-color: ${p.color};`}
`;

const TagText = styled.span<{
  hoveredColor: string;
  selected: boolean;
  completed: boolean;
}>`
  ${TagWrapper}:hover & {
    ${(p) => !p.completed && `color: ${p.hoveredColor};`}
  }
  ${(p) => p.selected && !p.completed && `color: ${p.hoveredColor};`}
  font-size: 14px;
  line-height: 20px;
`;

const NoteContainer = styled.div`
  word-wrap: break-word;
  width: 85%;
`;
