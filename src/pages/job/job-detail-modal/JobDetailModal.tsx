import { useState } from "react";
import {
  MediumText,
  Modal,
  VStack,
  HStack,
  Button,
  TextInput,
  SelectBox,
  CheckBox,
  SmallText,
  HoverMenu,
} from "../../../common";
import { colors } from "../../../common/styles";
import {
  JobDetailMenu,
  JobStatus,
  statusOptions,
  WorkStyle,
} from "../../../constants";
import { StyledIconTextWrapper } from "../../Header";
import { StyledWrapper } from "../AddJobModal";
import { IJob } from "../../../api-interface/job";
import { ValidationUtil } from "../../../common/utils/validation";
import { format } from "date-fns";
import { useJob } from "../../../common/hooks";
import styled from "styled-components";

type Props = {
  onClose: () => void;
  selectedJob: IJob;
};
export const JobDetailModal: React.FC<Props> = ({ onClose, selectedJob }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Info");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const {
    jobData,
    handleInputChange,
    showSuggestions,
    placeSuggestions,
    placeSuggestionOptions,
    handleLocationChange,
    handleCheckBoxChange,
    setShowSuggestions,
    updateJob,
    deleteJob,
    errorMessage,
  } = useJob({ initJobData: selectedJob });

  // stop place call when the location is same..
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
        {errorMessage && (
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        )}
        {selectedMenu === "Info" && (
          <VStack gap={18}>
            <HStack justify="flex-end">
              {selectedJob !== jobData &&
                ValidationUtil.require(jobData.companyName) &&
                ValidationUtil.require(jobData.jobTitle) && (
                  <Button onClick={() => updateJob(jobData)}>Save</Button>
                )}
            </HStack>
            <HStack gap={12}>
              <TextInput
                value={jobData.companyName}
                onChange={(value) => handleInputChange(value, "companyName")}
                title="Company"
                required
                validate={(v) => ValidationUtil.require(v)}
              />
              <TextInput
                value={jobData.jobTitle}
                onChange={(value) => handleInputChange(value, "jobTitle")}
                title="Job Title"
                required
                validate={(v) => ValidationUtil.require(v)}
              />
            </HStack>
            <HStack gap={12}>
              <TextInput
                value={
                  jobData.appliedDate
                    ? format(new Date(jobData.appliedDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(value) => handleInputChange(value, "appliedDate")}
                title="Applied Date"
                type="date"
              />
              <TextInput
                value={jobData.url}
                onChange={(value) => handleInputChange(value, "url")}
                title="Post Url"
              />
              <StyledWrapper>
                <TextInput
                  value={jobData.location}
                  onChange={(value) => handleInputChange(value, "location")}
                  title="Location"
                />
                {showSuggestions &&
                  placeSuggestions &&
                  placeSuggestions.length > 0 && (
                    <HoverMenu
                      options={placeSuggestionOptions}
                      onClick={(v) => handleLocationChange(v)}
                      onClose={() => setShowSuggestions(false)}
                      top={72}
                    />
                  )}
              </StyledWrapper>
            </HStack>
            <HStack gap={12}>
              <TextInput
                value={jobData.salary}
                onChange={(value) => handleInputChange(value, "salary")}
                title="Salary"
              />
              <TextInput
                value={jobData.jobBoard}
                onChange={(value) => handleInputChange(value, "jobBoard")}
                title="Job Board"
              />
              <SelectBox
                options={statusOptions}
                value={JobStatus[jobData.status]}
                onChange={(name) => handleInputChange(name, "status")}
                title="Status"
              />
            </HStack>
            <HStack gap={20}>
              {(Object.keys(WorkStyle) as Array<keyof typeof WorkStyle>).map(
                (key) => (
                  <CheckBox
                    checked={jobData.workStyle === key}
                    value={WorkStyle[key]}
                    onChange={() => handleCheckBoxChange(key)}
                    key={key}
                  />
                )
              )}
            </HStack>
          </VStack>
        )}
        {showConfirmModal && (
          <Modal onClose={() => setShowConfirmModal(false)}>
            <VStack align="center" gap={40}>
              <MediumText>Are you sure to delete this job?</MediumText>
              <HStack gap={30}>
                <Button onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </Button>
                <Button type="secondary" onClick={() => deleteJob()}>
                  Yes, Delete
                </Button>
              </HStack>
            </VStack>
          </Modal>
        )}
      </VStack>
    </Modal>
  );
};

const HStackWithBorder = styled(HStack)`
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.foggyGray};
`;
