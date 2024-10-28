import styled from "styled-components";
import { Button, HStack, Tab, VStack } from "../../common";
import { ArrowIcon } from "../../common/icons";
import { CONSTANTS, JobStatus } from "../../constants";
import { useState } from "react";
import { AddJobModal } from "./AddJobModal";
import { IJob } from "../../api-interface/job";
import { useFetch } from "../../common/hooks";

export const Job = () => {
  const [status, setStatus] = useState<keyof typeof JobStatus>("WISHLIST");
  const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
  const [jobs, setJobs] = useState<IJob[] | null>(null);
  const { data } = useFetch<IJob[]>({
    url: CONSTANTS.ENDPOINT.JOBS,
    onSuccess: () => {
      setJobs(data);
    }
  })
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
      <JobList>job</JobList>
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
`;
