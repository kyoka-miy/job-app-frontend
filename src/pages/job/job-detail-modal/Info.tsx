import { format } from "date-fns";
import { IJob } from "../../../api-interface/job";
import {
  VStack,
  HStack,
  Button,
  TextInput,
  SelectBox,
  CheckBox,
  SmallText,
  HoverMenu,
  Modal,
  MediumText,
} from "../../../common";
import { useJob } from "../../../common/hooks";
import { colors } from "../../../common/styles";
import { ValidationUtil } from "../../../common/utils/validation";
import { JobStatus, statusOptions, WorkStyle } from "../../../constants";
import { StyledWrapper } from "../AddJobModal";

type Props = {
  selectedJob: IJob;
  showConfirmModal: boolean;
  setShowConfirmModal: (v: boolean) => void;
};
export const Info = ({
  selectedJob,
  showConfirmModal,
  setShowConfirmModal,
}: Props) => {
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
  return (
    <VStack gap={18}>
      {errorMessage && (
        <SmallText color={colors.purple3}>{errorMessage}</SmallText>
      )}
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
      {showConfirmModal && (
        <Modal onClose={() => setShowConfirmModal(false)}>
          <VStack align="center" gap={40}>
            <MediumText>Are you sure to delete this job?</MediumText>
            <HStack gap={30}>
              <Button onClick={() => setShowConfirmModal(false)}>Cancel</Button>
              <Button type="secondary" onClick={() => deleteJob()}>
                Yes, Delete
              </Button>
            </HStack>
          </VStack>
        </Modal>
      )}
    </VStack>
  );
};
