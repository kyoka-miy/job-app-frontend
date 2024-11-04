import styled from "styled-components";
import {
  Button,
  CheckBox,
  HoverMenu,
  HStack,
  MediumText,
  Modal,
  SelectBox,
  SmallText,
  Tab,
  TextInput,
  VStack,
} from "../../common";
import { ArrowIcon } from "../../common/icons";
import {
  CONSTANTS,
  JobDetailMenu,
  JobStatus,
  statusOptions,
  WorkStyle,
} from "../../constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddJobModal, StyledWrapper } from "./AddJobModal";
import { AddOrUpdateJobRequest, IJob } from "../../api-interface/job";
import { useFetch } from "../../common/hooks";
import { colors } from "../../common/styles";
import moment from "moment";
import { StyledIconTextWrapper } from "../Header";
import { ValidationUtil } from "../../common/utils/validation";
import { format } from "date-fns";
import { PlaceSuggestionDto } from "../../api-interface/placeSuggestion";
import { debounce } from "lodash";
import { JobDetailModal } from "./job-detail-modal/JobDetailModal";

export const Job = () => {
  const [status, setStatus] = useState<keyof typeof JobStatus>("WISHLIST");
  const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>("Info");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [jobData, setJobData] = useState<AddOrUpdateJobRequest>({
    companyName: "",
    jobTitle: "",
    appliedDate: undefined,
    url: "",
    location: "",
    placeId: "",
    salary: "",
    jobBoard: "",
    status: "APPLIED",
    workStyle: undefined,
    note: "",
  });
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data, refetch } = useFetch<IJob[]>({
    url: CONSTANTS.ENDPOINT.JOBS,
    params: {
      status: status,
    },
    onSuccess: () => {},
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  useEffect(() => {
    refetch();
  }, [status]);

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
      if (key === "location") setShowSuggestions(value.length > 0);
    },
    [setJobData]
  );
  const { data: placeSuggestions, refetch: suggestionRefetch } = useFetch<
    PlaceSuggestionDto[]
  >({
    url: CONSTANTS.ENDPOINT.PLACES,
    params: { input: jobData.location },
  });

  const debouncedFetchSuggestions = useCallback(
    debounce(() => suggestionRefetch(), 500),
    [suggestionRefetch]
  );

  useEffect(() => {
    debouncedFetchSuggestions();
    return () => debouncedFetchSuggestions.cancel();
  }, [jobData.location]);

  const placeSuggestionOptions = useMemo(
    () =>
      placeSuggestions?.map((v) => ({
        key: v.placeId,
        value: v.description,
      })) || [],
    [placeSuggestions]
  );
  const handleLocationChange = useCallback(
    (key: string) => {
      const description = placeSuggestionOptions.find(
        (v) => v.key === key
      )?.value;
      setJobData((prev) => ({
        ...prev,
        location: description,
        placeId: key,
      }));
      setShowSuggestions(false);
    },
    [placeSuggestionOptions]
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
    <VStack gap={20}>
      <HStack justify="space-between">
        <HStack>
          {(Object.keys(JobStatus) as Array<keyof typeof JobStatus>).map(
            (v) => (
              <HStack align="center" gap={6} key={v}>
                <Tab onClick={() => setStatus(v)} selected={status === v}>
                  {JobStatus[v]}
                </Tab>
                {v !== "OFFER" && v !== "REJECTED" && <ArrowIcon />}
              </HStack>
            )
          )}
        </HStack>
        <Button onClick={() => setShowAddJobModal(true)} bold plusIcon>
          Add Job
        </Button>
      </HStack>
      {errorMessage && (
        <SmallText color={colors.purple3}>{errorMessage}</SmallText>
      )}
      <JobList>
        {data?.map((job, index) => (
          <JobWrapper key={index} onClick={() => setSelectedJob(job)}>
            <VStack gap={16}>
              <VStack gap={4}>
                <SmallText>{job.companyName}</SmallText>
                <SmallText color={colors.grayText}>{job.jobTitle}</SmallText>
              </VStack>
              <VStack align="right">
                <StyledSmallText color={colors.grayText}>
                  {moment(job.addedDatetime).fromNow()}
                </StyledSmallText>
              </VStack>
            </VStack>
          </JobWrapper>
        ))}
      </JobList>
      {showAddJobModal && (
        <AddJobModal onClose={() => setShowAddJobModal(false)} />
      )}
      {selectedJob && (
        <JobDetailModal
          onClose={() => setSelectedJob(null)}
          selectedJob={selectedJob}
        />
      )}
    </VStack>
  );
};

const JobList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
  padding: 8px;
  margin-top: 20px;
`;

const JobWrapper = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.white};
  width: calc((100% - 120px) / 4);
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);

  &:not(:last-child) {
    margin-right: 40px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid ${colors.purple1};
  }
`;

const StyledSmallText = styled(SmallText)`
  font-size: 12px;
`;
