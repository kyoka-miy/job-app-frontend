import { useCallback, useState } from "react";
import { CONSTANTS } from "../../constants";
import { BoardDto } from "../../api-interface/board";
import { useNavigate } from "react-router-dom";
import {
  Button,
  LargeText,
  MediumText,
  SmallText,
  TextInput,
  VStack,
  WhitePanel,
} from "../../common";
import React from "react";
import styled from "styled-components";
import { colors } from "../../common/styles";
import moment from "moment";
import { Modal } from "../../common";
import { ValidationUtil } from "../../common/utils/validation";
import { usePost } from "../../common/hooks/usePost";
import { useBoardContext } from "../../contexts/board";

export const Boards: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const { doPost, isLoading: postIsLoading } = usePost({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { boards, setBoardStore } = useBoardContext();

  const onSelectBoard = useCallback(
    (selectedBoard: BoardDto) => {
      setBoardStore(selectedBoard);
      navigate(CONSTANTS.LINK.JOB);
    },
    [setBoardStore, navigate]
  );
  const onAddBoard = useCallback(
    (name: string) => {
      doPost({
        name: name,
      });
    },
    [doPost]
  );

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <VStack gap={40} align="center">
            <MediumText>Add a board</MediumText>
            <TextInput
              value={name}
              onChange={setName}
              validate={(v) => ValidationUtil.require(v)}
              title="Name"
              required
            />
            {errorMessage && (
              <SmallText color={colors.purple3}>{errorMessage}</SmallText>
            )}
            <Button
              disabled={!ValidationUtil.require(name)}
              loading={postIsLoading}
              onClick={() => onAddBoard(name)}
            >
              Add
            </Button>
          </VStack>
        </Modal>
      )}
      (
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
