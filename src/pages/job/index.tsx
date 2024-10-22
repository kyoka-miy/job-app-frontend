import styled from "styled-components";
import {
  Button,
  HStack,
  Modal,
  SmallText,
  Tab,
  TextInput,
  VStack,
} from "../../common";
import { ArrowIcon } from "../../common/icons";
import { JobStatus, WorkStyle } from "../../constants";
import { useState } from "react";

export const Job = () => {
  const [status, setStatus] = useState<keyof typeof JobStatus>("WISHLIST");
  const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
  const [jobData, setJobData] = useState({
    company: "",
    jobTitle: "",
    appliedDate: "",
    postUrl: "",
    location: "",
    status: JobStatus.APPLIED,
    remote: WorkStyle.REMOTE,
  });

  const handleInputChange = (value: string, key: string) => {
    setJobData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
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
        <Button onClick={() => setShowAddJobModal(true)}>+ Add Job</Button>
      </HStack>
      <JobList>job</JobList>
      {showAddJobModal && (
        <Modal onClose={() => setShowAddJobModal(false)}>
          <VStack gap={20}>
            <VStack align="center">
              <SmallText bold>Add Job</SmallText>
            </VStack>
            <TextInput
              value={jobData.company}
              onChange={(value) => handleInputChange(value, "company")}
              title="Company (Required)"
            />
            <TextInput
              value={jobData.jobTitle}
              onChange={(value) => handleInputChange(value, "jobTitle")}
              title="Job Title (Required)"
            />
            <HStack gap={12}>
              <TextInput
                value={jobData.appliedDate}
                onChange={(value) => handleInputChange(value, "appliedDate")}
                title="Applied Date"
              />
              <TextInput
                value={jobData.postUrl}
                onChange={(value) => handleInputChange(value, "postUrl")}
                title="Post Url"
              />
            </HStack>
            <TextInput
              value={jobData.location}
              onChange={(value) => handleInputChange(value, "location")}
              title="Location"
            />
          </VStack>
        </Modal>
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
