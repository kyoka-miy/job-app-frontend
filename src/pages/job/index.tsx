import styled from "styled-components";
import { Button, HStack, SmallText, Tab, VStack } from "../../common";
import { ArrowIcon } from "../../common/icons";
import { CONSTANTS, JobStatus } from "../../constants";
import { useEffect, useState } from "react";
import { AddJobModal } from "./AddJobModal";
import { IJob } from "../../api-interface/job";
import { useFetch } from "../../common/hooks";
import { colors } from "../../common/styles";
import moment from "moment";

export const Job = () => {
  const [status, setStatus] = useState<keyof typeof JobStatus>("WISHLIST");
  const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { data, refetch } = useFetch<IJob[]>({
    url: CONSTANTS.ENDPOINT.JOBS,
    params: {
      status: status,
    },
    onSuccess: () => {},
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
                <Tab onClick={() => setStatus(v)} selected={status === v}>
                  {JobStatus[v]}
                </Tab>
                {v !== "OFFER" && <ArrowIcon />}
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
          <JobWrapper key={index}>
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
          </JobWrapper>
        ))}
      </JobList>
      {showAddJobModal && (
        <AddJobModal onClose={() => setShowAddJobModal(false)} />
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

const JobWrapper = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.white};
  width: calc((100% - 120px) / 4);
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);

  &:not(:last-child) {
    margin-right: 40px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid ${colors.purple1};
  }
`;

const StyledSmallText = styled(SmallText)`
  font-size: 12px;
`;
