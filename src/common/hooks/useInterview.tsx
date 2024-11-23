import { useCallback, useMemo, useState } from "react";
import {
  AddOrUpdateInterviewRequest,
  InterviewWithTagsDto,
} from "../../api-interface/Interview";
import { useFetch, usePost } from ".";
import { CONSTANTS } from "../../constants";
import { format, parse, setMilliseconds, setSeconds } from "date-fns";
import { JobDto } from "../../api-interface/job";

type Props = {
  selectedJob: JobDto;
  initInterview?: InterviewWithTagsDto;
  onAddSuccess?: () => void;
  onEditSuccess?: () => void;
};

export const useInterview = ({
  selectedJob,
  initInterview,
  onAddSuccess,
  onEditSuccess,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [interviewData, setInterviewData] =
    useState<AddOrUpdateInterviewRequest>({
      title: initInterview ? initInterview.interview.title : "",
      tags: initInterview ? initInterview.tags : undefined,
      interviewDateTime: initInterview
        ? new Date(initInterview.interview.interviewDateTime)
        : new Date(),
      note: initInterview ? initInterview.interview.note : "",
      completed: initInterview ? initInterview.interview.completed : false,
    });
  const initInterviewData = useMemo(() => interviewData, []);

  const { data: interviews, refetch: refetchInterviews } = useFetch<
    InterviewWithTagsDto[]
  >({
    url: CONSTANTS.ENDPOINT.INTERVIEWS_JOB(selectedJob.jobId),
    shouldFetch: true,
  });
  const { doPost: addInterview } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS_JOB(selectedJob.jobId),
    onSuccess: () => {
      onAddSuccess && onAddSuccess();
      refetchInterviews();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: updateInterview } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS(initInterview?.interview.interviewId),
    method: "PUT",
    onSuccess: () => {
      onEditSuccess && onEditSuccess();
      refetchInterviews();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: deleteInterview } = usePost({
    url: CONSTANTS.ENDPOINT.INTERVIEWS(initInterview?.interview.interviewId),
    method: "DELETE",
    onSuccess: () => {
      setErrorMessage("");
      onEditSuccess && onEditSuccess();
      refetchInterviews();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  const handleInputChange = useCallback(
    (value: string, key: keyof AddOrUpdateInterviewRequest) => {
      if (key === "tags") {
        setInterviewData((prev) => {
          if (prev.tags?.includes(value))
            return {
              ...prev,
              [key]: prev.tags.filter((v) => v !== value),
            };
          else
            return {
              ...prev,
              [key]: [...(prev.tags || []), value],
            };
        });
      } else
        setInterviewData((prev) => ({
          ...prev,
          [key]: value,
        }));
    },
    [setInterviewData]
  );
  const handleCheckBoxChange = useCallback(
    () =>
      setInterviewData((prev) => ({
        ...prev,
        completed: !prev.completed,
      })),
    [setInterviewData]
  );
  const handleDateChange = useCallback(
    (date: string) => {
      let newDatetime = new Date();
      if (
        interviewData.interviewDateTime instanceof Date &&
        !isNaN(interviewData.interviewDateTime.getTime())
      ) {
        const time = format(interviewData.interviewDateTime, "HH:mm");
        newDatetime = parse(
          `${date}T${time}`,
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        );
      } else {
        const time = format(newDatetime, "HH:mm");
        newDatetime = parse(
          `${date}T${time}`,
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        );
      }
      setInterviewData((prev) => ({
        ...prev,
        interviewDateTime: newDatetime,
      }));
    },
    [interviewData.interviewDateTime]
  );
  const handleTimeChange = useCallback(
    (time: string) => {
      const date =
        interviewData.interviewDateTime instanceof Date &&
        !isNaN(interviewData.interviewDateTime.getTime())
          ? format(interviewData.interviewDateTime, "yyyy-MM-dd")
          : "";
      let newDatetime = parse(
        `${date}T${time}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      );
      newDatetime = setSeconds(setMilliseconds(newDatetime, 0), 0);
      setInterviewData((prev) => ({
        ...prev,
        interviewDateTime: newDatetime,
      }));
    },
    [interviewData.interviewDateTime]
  );

  return {
    interviewData,
    interviews,
    refetchInterviews,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    handleCheckBoxChange,
    errorMessage,
    initInterviewData,
    addInterview,
    updateInterview,
    deleteInterview,
  };
};
