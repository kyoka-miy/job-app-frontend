import { format } from "date-fns";
import { JobDto } from "../../../../api-interface/job";
import {
  VStack,
  HStack,
  Button,
  TextInput,
  SelectBox,
  CheckBox,
  SmallText,
  HoverMenu,
} from "../../../../common";
import { useJob } from "../../../../common/hooks";
import { colors } from "../../../../common/styles";
import { ValidationUtil } from "../../../../common/utils/validation";
import { JobStatus, statusOptions, WorkStyle } from "../../../../constants";
import styled from "styled-components";
import { useEffect } from "react";

type Props = {
  selectedJob?: JobDto;
  status?: keyof typeof JobStatus;
};

export const JobInfo = ({ selectedJob, status }: Props) => {
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
    addJob,
    errorMessage,
  } = useJob({ initJobData: selectedJob });
  
  useEffect(() => {
    if (status) handleInputChange(status, "status");
  }, [status, handleInputChange]);

  return (
    <VStack gap={18}>
      {errorMessage && (
        <SmallText color={colors.purple3}>{errorMessage}</SmallText>
      )}
      <HStack justify="flex-end">
        {selectedJob &&
          selectedJob !== jobData &&
          ValidationUtil.require(jobData.companyName) &&
          ValidationUtil.require(jobData.jobTitle) && (
            <Button onClick={() => updateJob(jobData)} bold>
              Save
            </Button>
          )}
        {!selectedJob && (
          <Button
            onClick={() => addJob(jobData)}
            bold
            plusIcon
            disabled={
              !ValidationUtil.require(jobData.companyName) ||
              !ValidationUtil.require(jobData.jobTitle)
            }
          >
            Add
          </Button>
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
                onClose={() => {
                  setShowSuggestions(false);
                  handleInputChange("", "location");
                }}
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
      <TextInput
        value={jobData.note}
        onChange={(value) => handleInputChange(value, "note")}
        title="Note"
        type="textarea"
        height={100}
      />
    </VStack>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
`;
