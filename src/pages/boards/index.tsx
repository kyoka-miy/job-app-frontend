import styled from "styled-components";
import {
  Button,
  DeletionConfirmModal,
  HStack,
  MediumText,
  SmallText,
  VStack,
  WhitePanel,
} from "../../common";
import { CONSTANTS } from "../../constants";
import { useFetch, usePost } from "../../common/hooks";
import { BoardDto } from "../../api-interface/board";
import { colors } from "../../common/styles";
import moment from "moment";
import { EditIcon, TrashIcon } from "../../common/icons";
import { useState } from "react";
import { BoardDetailModal } from "../board-select/BoardDetailModal";

export const Boards = () => {
  const [showBoardDetailModal, setShowBoardDetailModal] =
    useState<boolean>(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardDto | null>(null);
  const { data: boards, refetch } = useFetch<BoardDto[]>({
    url: CONSTANTS.ENDPOINT.BOARDS,
    shouldFetch: true,
  });
  const { doPost: deleteBoard } = usePost({
    url: CONSTANTS.ENDPOINT.BOARD(selectedBoard ? selectedBoard.boardId : ""),
    method: "DELETE",
    onSuccess: () => {
      setShowDeleteConfirmModal(false);
      setSelectedBoard(null);
      refetch();
    },
  });
  return (
    <StyledWrapper gap={40} align="center" width="85%">
      {showBoardDetailModal && (
        <BoardDetailModal
          onClose={() => {
            setShowBoardDetailModal(false);
            setSelectedBoard(null);
          }}
          initBoard={selectedBoard ? selectedBoard : null}
          refetch={refetch}
        />
      )}
      {showDeleteConfirmModal && (
        <DeletionConfirmModal
          onClose={() => setShowDeleteConfirmModal(false)}
          onDelete={deleteBoard}
        />
      )}
      <MediumText bold>Boards</MediumText>
      <VStack align="flex-end">
        <Button
          bold
          plusIcon
          width={100}
          onClick={() => setShowBoardDetailModal(true)}
        >
          Add
        </Button>
      </VStack>
      <BoardsWrapper>
        {boards?.map((board) => (
          <StyledWhitePanel>
            <VStack align="left" gap={35}>
              <HStack justify="space-between">
                <SmallText>{board.name}</SmallText>
                <HStack gap={8}>
                  <IconWrapper
                    onClick={() => {
                      setShowBoardDetailModal(true);
                      setSelectedBoard(board);
                    }}
                  >
                    <EditIcon color={colors.grayText} />
                  </IconWrapper>
                  <IconWrapper
                    onClick={() => {
                      setShowDeleteConfirmModal(true);
                      setSelectedBoard(board);
                    }}
                  >
                    <TrashIcon color={colors.grayText} />
                  </IconWrapper>
                </HStack>
              </HStack>
              <SmallText color={colors.mutedGraphite}>
                Created {moment(board.createdDatetime).fromNow()}
              </SmallText>
            </VStack>
          </StyledWhitePanel>
        ))}
      </BoardsWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(VStack)`
  margin: auto;
  margin-top: 60px;
`;

const BoardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
  padding: 8px;
`;

const StyledWhitePanel = styled(WhitePanel)`
  width: calc((100% - 120px) / 4);
  margin-bottom: 40px;
  box-sizing: border-box;
  &:nth-child(4n) {
    margin-right: 0;
  }

  &:not(:nth-child(4n)) {
    margin-right: 40px;
  }
`;

const IconWrapper = styled.div`
  border-radius: 8px;
  padding: 3px 3px 1px 3px;
  height: fit-content;
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(50, 50, 50, 0.5);

  &: hover {
    border: 1px solid ${colors.purple1};
  }
`;
