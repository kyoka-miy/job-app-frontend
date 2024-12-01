import { useState } from "react";
import {
  MediumText,
  Modal,
  VStack,
  HStack,
  Button,
  SmallText,
  DeletionConfirmModal,
} from "../../../common";
import { colors } from "../../../common/styles";
import { JobDetailMenu } from "../../../constants";
import { StyledIconTextWrapper } from "../../Header";
import { JobDto } from "../../../api-interface/job";
import styled from "styled-components";
import { Info } from "./Info";
import { Assignments } from "./assignment/Assignments";
import { Interviews } from "./interview/Interviews";
import { useJob } from "../../../common/hooks";
import { Activity } from "./activity/Activity";

type Props = {
  onClose: () => void;
  selectedJob: JobDto;
};
export const JobDetailModal: React.FC<Props> = ({ onClose, selectedJob }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Info");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { deleteJob } = useJob({ initJobData: selectedJob });
  return (
    <Modal width="85%" innerWidth="85%" onClose={onClose}>
      <VStack gap={24}>
        <HStack gap={12}>
          <VStack gap={8}>
            <MediumText bold>{selectedJob.companyName}</MediumText>
            <MediumText color={colors.grayText}>
              {selectedJob.jobTitle}
            </MediumText>
          </VStack>
          <Button type="secondary" onClick={() => setShowConfirmModal(true)}>
            Delete
          </Button>
        </HStack>
        <HStackWithBorder gap={12}>
          {JobDetailMenu.map((v) => (
            <StyledIconTextWrapper
              align="center"
              key={v.text}
              gap={8}
              selected={v.text === selectedMenu}
              onClick={() => setSelectedMenu(v.text)}
            >
              {v.icon({ color: colors.grayText })}
              <SmallText color={colors.grayText}>{v.text}</SmallText>
            </StyledIconTextWrapper>
          ))}
        </HStackWithBorder>
        {selectedMenu === "Info" && <Info selectedJob={selectedJob} />}
        {selectedMenu === "Assignments" && (
          <Assignments selectedJob={selectedJob} />
        )}
        {selectedMenu === "Interviews" && (
          <Interviews selectedJob={selectedJob} />
        )}
        {selectedMenu === "Activities" && (
          <Activity selectedJob={selectedJob} />
        )}
      </VStack>
      {showConfirmModal && (
        <DeletionConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onDelete={deleteJob}
        />
      )}
    </Modal>
  );
};
const HStackWithBorder = styled(HStack)`
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.foggyGray};
`;
