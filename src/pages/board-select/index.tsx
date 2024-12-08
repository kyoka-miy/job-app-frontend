import { useCallback, useState } from "react";
import { CONSTANTS } from "../../constants";
import { BoardDto } from "../../api-interface/board";
import { useNavigate } from "react-router-dom";
import {
  Button,
  LargeText,
  MediumText,
  SmallText,
  VStack,
  WhitePanel,
} from "../../common";
import React from "react";
import styled from "styled-components";
import { colors } from "../../common/styles";
import moment from "moment";
import { useBoardContext } from "../../contexts/board";
import { BoardDetailModal } from "./BoardDetailModal";

export const BoardSelect: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { boards, setBoardStore } = useBoardContext();

  const onSelectBoard = useCallback(
    (selectedBoard: BoardDto) => {
      setBoardStore(selectedBoard);
      navigate(CONSTANTS.LINK.JOB);
    },
    [setBoardStore, navigate]
  );

  return (
    <>
      {showModal && <BoardDetailModal onClose={() => setShowModal(false)}/>}(
      <BoardWrapper>
        <VStack gap={50} align="center">
          <LargeText bold>Select Your Board</LargeText>
          <VStack gap={40} align="center">
            <Button
              width={220}
              onClick={() => setShowModal(true)}
              plusIcon
              bold
            >
              Add Board
            </Button>
            <VStack gap={24}>
              <BoardList>
                {boards?.map((v, index) => (
                  <div key={index} style={{ margin: 20 }}>
                    <StyledWhitePanel onClick={() => onSelectBoard(v)}>
                      <VStack align="left" gap={35}>
                        <MediumText>{v.name}</MediumText>
                        <SmallText color={colors.mutedGraphite}>
                          Created {moment(v.createdDatetime).fromNow()}
                        </SmallText>
                      </VStack>
                    </StyledWhitePanel>
                  </div>
                ))}
              </BoardList>
            </VStack>
          </VStack>
        </VStack>
      </BoardWrapper>
      )
    </>
  );
};

const BoardWrapper = styled.div`
  width: auto;
  margin: auto;
  padding-top: 130px;
  height: 100vh;
`;

const BoardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 960px;
  margin: auto;
  overflow-y: auto;
`;

const StyledWhitePanel = styled(WhitePanel)`
  display: flex;
  justify-content: center;
  width: 280px;
  height: 100px;
`;
