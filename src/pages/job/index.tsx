import styled from "styled-components";
import { HStack, Tab, VStack } from "../../common";
import { ArrowIcon } from "../../common/icons";

export const Job = () => {
  return (
    <VStack gap={20}>
      <HStack>
        <HStack align="center" gap={6}>
          <Tab selected>Wishlist</Tab>
          <ArrowIcon />
        </HStack>
        <HStack align="center" gap={6}>
          <Tab>Applied</Tab>
          <ArrowIcon />
        </HStack>
        <HStack align="center" gap={6}>
          <Tab>Interview</Tab>
          <ArrowIcon />
        </HStack>
        <Tab>Offer</Tab>
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
