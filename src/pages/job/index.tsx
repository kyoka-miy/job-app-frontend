import styled from "styled-components";
import {
  Button,
  HStack,
  SmallText,
  Tab,
  VStack,
  WhitePanel,
} from "../../common";
import { ArrowIcon } from "../../common/icons";
import { CONSTANTS, JobStatus } from "../../constants";
import { useEffect, useState } from "react";
import { AddJobModal } from "./AddJobModal";
import { JobDto } from "../../api-interface/job";
import { useFetch } from "../../common/hooks";
import { colors } from "../../common/styles";
import moment from "moment";
import { JobDetailModal } from "./job-detail-modal/JobDetailModal";

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
        <AddJobModal onClose={() => setShowAddJobModal(false)} />
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
  margin-top: 20px;
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
