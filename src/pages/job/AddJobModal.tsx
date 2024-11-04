import {
  Button,
  CheckBox,
  HoverMenu,
  HStack,
  Modal,
  SelectBox,
  SmallText,
  TextInput,
  VStack,
} from "../../common";
import {
  JobStatus,
  statusOptions,
  WorkStyle,
} from "../../constants";
import { ValidationUtil } from "../../common/utils/validation";
import { format } from "date-fns";
import { colors } from "../../common/styles";
import styled from "styled-components";
import { useJob } from "../../common/hooks/useJob";

type Props = {
  onClose: () => void;
};

export const AddJobModal: React.FC<Props> = ({ onClose }) => {
  const {
    jobData,
    handleInputChange,
    showSuggestions,
    placeSuggestions,
    placeSuggestionOptions,
    handleLocationChange,
    handleCheckBoxChange,
    setShowSuggestions,
    addJob,
    errorMessage,
  } = useJob();

  return (
    <Modal onClose={() => onClose()}>
      <VStack gap={40} align="center">
        <VStack>
          <SmallText bold>Add Job</SmallText>
        </VStack>
        <VStack gap={20}>
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
          <HStack gap={12}>
            <TextInput
              value={
                jobData.appliedDate instanceof Date &&
                !isNaN(jobData.appliedDate.getTime())
                  ? format(jobData.appliedDate, "yyyy-MM-dd")
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
          </HStack>
          <HStack gap={12}>
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
            <TextInput
              value={jobData.salary}
              onChange={(value) => handleInputChange(value, "salary")}
              title="Salary"
            />
          </HStack>
          <HStack gap={12}>
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
            height={80}
          />
        </VStack>
        {errorMessage && (
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        )}
        <Button
          onClick={() => addJob(jobData)}
          disabled={
            !(jobData.companyName.length > 0 && jobData.jobTitle.length > 0)
          }
          width="100%"
          bold
          plusIcon
        >
          Add
        </Button>
      </VStack>
    </Modal>
  );
};

export const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
`;
