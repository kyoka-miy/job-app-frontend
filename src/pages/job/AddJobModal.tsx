import { useCallback, useMemo, useState } from "react";
import {
  Button,
  CheckBox,
  HStack,
  Modal,
  SelectBox,
  SmallText,
  TextInput,
  VStack,
} from "../../common";
import { AddOrUpdateJobRequest } from "../../api-interface/job";
import { usePost } from "../../common/hooks";
import { CONSTANTS, JobStatus, WorkStyle } from "../../constants";
import { ValidationUtil } from "../../common/utils/validation";
import { format } from "date-fns";
import { colors } from "../../common/styles";

type Props = {
  onClose: () => void;
};
export const AddJobModal: React.FC<Props> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [jobData, setJobData] = useState<AddOrUpdateJobRequest>({
    companyName: "",
    jobTitle: "",
    appliedDate: undefined,
    url: "",
    location: "",
    salary: "",
    jobBoard: "",
    status: "APPLIED",
    workStyle: undefined,
    note: "",
  });
  const { doPost, isLoading } = usePost({
    url: CONSTANTS.ENDPOINT.JOBS,
    onSuccess: () => window.location.reload(),
    onError: (err) => setErrorMessage(err),
  });
  const statusOptions = useMemo(
    () =>
      (Object.keys(JobStatus) as Array<keyof typeof JobStatus>).map((key) => ({
        name: key,
        value: JobStatus[key],
      })),
    []
  );
  const handleInputChange = useCallback(
    (value: string, key: keyof AddOrUpdateJobRequest) => {
      if (key === "appliedDate") {
        setJobData((prev) => ({
          ...prev,
          [key]: new Date(value),
        }));
      } else
        setJobData((prev) => ({
          ...prev,
          [key]: value,
        }));
    },
    [setJobData]
  );
  const handleCheckBoxChange = useCallback(
    (key: keyof typeof WorkStyle) => {
      if (jobData.workStyle === key)
        setJobData((prev) => ({
          ...prev,
          workStyle: undefined,
        }));
      else
        setJobData((prev) => ({
          ...prev,
          workStyle: key,
        }));
    },
    [setJobData, jobData.workStyle]
  );
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
            <TextInput
              value={jobData.location}
              onChange={(value) => handleInputChange(value, "location")}
              title="Location"
            />
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
          onClick={() => doPost(jobData)}
          disabled={
            !(jobData.companyName.length > 0 && jobData.jobTitle.length > 0)
          }
          width="100%"
          loading={isLoading}
          bold
          plusIcon
        >
          Add
        </Button>
      </VStack>
    </Modal>
  );
};