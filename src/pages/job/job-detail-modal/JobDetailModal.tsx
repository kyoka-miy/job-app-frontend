import { useCallback, useEffect, useMemo, useState } from "react";
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
  CONSTANTS,
  JobDetailMenu,
  JobStatus,
  statusOptions,
  WorkStyle,
} from "../../../constants";
import { StyledIconTextWrapper } from "../../Header";
import { StyledWrapper } from "../AddJobModal";
import { AddOrUpdateJobRequest, IJob } from "../../../api-interface/job";
import { PlaceSuggestionDto } from "../../../api-interface/placeSuggestion";
import { useFetch } from "../../../common/hooks";
import { debounce } from "lodash";
import { ValidationUtil } from "../../../common/utils/validation";
import { format } from "date-fns";
import { useJob } from "../../../common/hooks/useJob";

type Props = {
  onClose: () => void;
  selectedJob: IJob;
};
export const JobDetailModal: React.FC<Props> = ({ onClose, selectedJob }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Info");
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
  } = useJob({ initJobData: selectedJob });

  // stop place call when the location is same..
  return (
    <Modal width="85%" innerWidth="85%" onClose={onClose}>
      <VStack gap={30}>
        <VStack gap={12}>
          <MediumText bold>{selectedJob.companyName}</MediumText>
          <MediumText color={colors.grayText}>
            {selectedJob.jobTitle}
          </MediumText>
        </VStack>
        <HStack gap={12}>
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
        </HStack>
        {selectedMenu === "Info" && (
          <VStack gap={20}>
            <HStack justify="flex-end" gap={12}>
              {selectedJob !== jobData && (
                <Button onClick={() => updateJob(jobData)}>Save</Button>
              )}
              <Button type="secondary">Delete</Button>
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
      </VStack>
    </Modal>
  );
};
