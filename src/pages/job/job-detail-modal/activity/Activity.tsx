import styled from "styled-components";
import { JobDto } from "../../../../api-interface/job";
import { useFetch } from "../../../../common/hooks";
import { CONSTANTS } from "../../../../constants";
import {
  Button,
  HStack,
  MediumText,
  SmallText,
  VStack,
} from "../../../../common";
import { ActivityDto } from "../../../../api-interface/activity";
import { format } from "date-fns";
import moment from "moment";
import { colors } from "../../../../common/styles";
import { useState } from "react";
import { ActivityDetailPanel } from "./ActivityDetailPanel";

type Props = {
  selectedJob: JobDto;
};

export const Activity = ({ selectedJob }: Props) => {
  const [showAddPanel, setShowAddPanel] = useState<boolean>(false);
  const [showDetailPanel, setShowDetailPanel] = useState<number | null>(null);
  const { data: activities, refetch: refetchActivities } = useFetch<
    ActivityDto[]
  >({
    url: CONSTANTS.ENDPOINT.ACTIVITIES_JOB(selectedJob.jobId),
    shouldFetch: true,
  });
  console.log(showDetailPanel);
  return (
    <VStack gap={18}>
      <HStack justify="flex-end">
        <Button plusIcon bold onClick={() => setShowAddPanel(true)}>
          Add
        </Button>
      </HStack>
      {showAddPanel && (
        <ActivityDetailPanel
          setShowAddPanel={setShowAddPanel}
          selectedJob={selectedJob}
          refetchActivities={refetchActivities}
        />
      )}
      <VStack gap={12}>
        {activities &&
          activities.map((activity, index) =>
            showDetailPanel !== index ? (
              <ActivityWrapper
                key={index}
                number={index}
                gap={20}
                align="center"
                onClick={() => setShowDetailPanel(index)}
                showDetailPanel={showDetailPanel}
              >
                <MediumText>{activity.name}</MediumText>
                <HStack gap={8} align="center">
                  <SmallText>
                    {format(activity.activityDateTime, "yyyy/MM/dd")}
                  </SmallText>
                  <SmallText color={colors.grayText}>
                    {moment(activity.activityDateTime).fromNow()}
                  </SmallText>
                </HStack>
              </ActivityWrapper>
            ) : (
              <ActivityDetailPanel
                selectedJob={selectedJob}
                setShowDetailPanel={setShowDetailPanel}
                refetchActivities={refetchActivities}
                initActivity={activity}
              />
            )
          )}
      </VStack>
    </VStack>
  );
};

const ActivityWrapper = styled(HStack)<{
  number: number;
  showDetailPanel: number | null;
}>`
  margin-left: 20px;
  position: relative;
  height: 46px;
  border-radius: 8px;
  padding-left: 8px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.foggyGray}70;
  }

  &:before {
    content: "";
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${colors.foggyGray};
  }

  &:not(:last-child):after {
    content: "";
    position: absolute;
    left: -16px;
    top: 19px;
    width: 2px;
    height: 57px;
    background-color: ${colors.foggyGray};
  }

  ${(p) =>
    p.showDetailPanel &&
    p.number === p.showDetailPanel - 1 &&
    `
    &:after {
      display: none;
    }
  `}
`;
