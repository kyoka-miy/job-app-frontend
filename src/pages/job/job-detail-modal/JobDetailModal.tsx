import { useState } from "react";
import {
  MediumText,
  Modal,
  VStack,
  HStack,
  Button,
  SmallText,
} from "../../../common";
import { colors } from "../../../common/styles";
import { JobDetailMenu } from "../../../constants";
import { StyledIconTextWrapper } from "../../Header";
import { IJob } from "../../../api-interface/job";
import styled from "styled-components";
import { Info } from "./Info";
import { Assignments } from "./Assignments";
import { Interviews } from "./Interviews";

type Props = {
  onClose: () => void;
  selectedJob: IJob;
};
export const JobDetailModal: React.FC<Props> = ({ onClose, selectedJob }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Info");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

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
        {selectedMenu === "Info" && (
          <Info
            selectedJob={selectedJob}
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
          />
        )}
        {selectedMenu === "Assignments" && <Assignments />}
        {selectedMenu === "Interviews" && <Interviews />}
      </VStack>
    </Modal>
  );
};

const HStackWithBorder = styled(HStack)`
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.foggyGray};
`;
