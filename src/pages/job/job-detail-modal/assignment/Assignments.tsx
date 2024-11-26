import { useState } from "react";
import { Button, HStack, SmallText, VStack } from "../../../../common";
import { JobDto } from "../../../../api-interface/job";
import { useFetch } from "../../../../common/hooks";
import { CONSTANTS } from "../../../../constants";
import { AssignmentDetailPanel } from "./AssignmentDetailPanel";
import { format } from "date-fns";
import { colors } from "../../../../common/styles";
import moment from "moment";
import { AssignmentDto } from "../../../../api-interface/assignment";
import styled from "styled-components";

type Props = {
  selectedJob: JobDto;
};

export const Assignments = ({ selectedJob }: Props) => {
  const [showAddPanel, setShowAddPanel] = useState<boolean>(false);
  const [showAssignmentDetailPanel, setShowAssignmentDetailPanel] = useState<
    number | null
  >(null);
  const { data: assignments, refetch: refetchAssignments } = useFetch<
    AssignmentDto[]
  >({
    url: CONSTANTS.ENDPOINT.ASSIGNMENTS_JOB(selectedJob.jobId),
    shouldFetch: true,
  });
  return (
    <VStack gap={18}>
      <HStack justify="flex-end">
        <Button plusIcon bold onClick={() => setShowAddPanel(true)}>
          Add
        </Button>
      </HStack>
      {showAddPanel && (
        <AssignmentDetailPanel
          selectedJob={selectedJob}
          setShowAddPanel={setShowAddPanel}
          setShowAssignmentDetailPanel={setShowAssignmentDetailPanel}
          refetchAssignments={refetchAssignments}
        />
      )}
      {assignments &&
        assignments.map((v, index) =>
          showAssignmentDetailPanel !== index ? (
            <AssignmentWrapper
              key={index}
              gap={12}
              completed={v.completed}
              onClick={() => setShowAssignmentDetailPanel(index)}
            >
              <SmallText bold>{v.title}</SmallText>
              <HStack justify="space-between" width="100%">
                <VStack gap={12} width="80%">
                  {v.note && (
                    <NoteContainer>
                      <SmallText>{v.note}</SmallText>
                    </NoteContainer>
                  )}
                </VStack>
                <VStack align="flex-end" gap={4} width="20%">
                  <SmallText>
                    {v.deadlineDateTime instanceof Date &&
                    !isNaN(v.deadlineDateTime.getTime())
                      ? format(v.deadlineDateTime, "yyyy/MM/dd")
                      : ""}
                  </SmallText>
                  <SmallText color={colors.grayText}>
                    {moment(v.deadlineDateTime).fromNow()}
                  </SmallText>
                </VStack>
              </HStack>
            </AssignmentWrapper>
          ) : (
            <AssignmentDetailPanel
              selectedJob={selectedJob}
              setShowAssignmentDetailPanel={setShowAssignmentDetailPanel}
              refetchAssignments={refetchAssignments}
              initAssigment={v}
            />
          )
        )}
    </VStack>
  );
};

const AssignmentWrapper = styled(VStack)<{ completed: boolean }>`
  padding: 26px 20px;
  border-radius: 8px;
  background-color: ${(p) => (p.completed ? colors.softSilver : colors.white)};
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);

  &:hover {
    cursor: pointer;
  }
`;

const NoteContainer = styled.div`
  word-wrap: break-word;
  width: 85%;
`;
