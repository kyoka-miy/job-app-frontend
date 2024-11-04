import { useCallback, useEffect, useMemo, useState } from "react";
import { AddOrUpdateJobRequest, IJob } from "../../api-interface/job";
import { useFetch, usePost } from ".";
import { PlaceSuggestionDto } from "../../api-interface/placeSuggestion";
import { CONSTANTS, WorkStyle } from "../../constants";
import { debounce, update } from "lodash";

type Props = {
  initJobData?: IJob;
};
export const useJob = ({ initJobData }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [jobData, setJobData] = useState<AddOrUpdateJobRequest>(
    initJobData
      ? initJobData
      : {
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
        }
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { doPost: addJob, isLoading: addJobLoading } = usePost({
    url: CONSTANTS.ENDPOINT.JOBS,
    onSuccess: () => window.location.reload(),
    onError: (err) => setErrorMessage(err),
  });
  const { doPost: updateJob } = usePost({
    url: CONSTANTS.ENDPOINT.JOB_UPDATE(initJobData?.jobId || ""),
    method: "PUT",
    onSuccess: () => window.location.reload(),
    onError: (err) => setErrorMessage(err),
  });
  const { doPost: deleteJob } = usePost({
    url: CONSTANTS.ENDPOINT.JOB_UPDATE(initJobData?.jobId || ""),
    method: "DELETE",
    onSuccess: () => window.location.reload(),
    onError: (err) => setErrorMessage(err),
  });

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

  return {
    jobData,
    showSuggestions,
    placeSuggestions,
    setShowSuggestions,
    handleInputChange,
    placeSuggestionOptions,
    handleLocationChange,
    handleCheckBoxChange,
    updateJob,
    deleteJob,
    errorMessage
  };
};
