import styled from "styled-components";
import { Button, HStack, Tab, VStack } from "../../common";
import { ArrowIcon } from "../../common/icons";
import { JobStatus } from "../../constants";
import { useState } from "react";

export const Job = () => {
  const [status, setStatus] = useState<keyof typeof JobStatus>("WISHLIST");
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
        <Button>+ Add</Button>
      </HStack>
      <JobList>job</JobList>
    </VStack>
  );
};

const JobList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
`;
