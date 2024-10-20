import { useCallback, useState } from "react";
import { useFetch } from "../../common/hooks/useFetch";
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
} from "../../common";
import React from "react";
import styled from "styled-components";
import { colors } from "../../common/styles";
import moment from "moment";
import { Modal } from "../../common/ui/Modal";
import { ValidationUtil } from "../../common/utils/validation";
import { usePost } from "../../common/hooks/usePost";

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
  // TODO: Move to board context
  const { data, isLoading } = useFetch<BoardDto[]>({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      if (data.length === 1) {
        sessionStorage.setItem("board", JSON.stringify(data[0]));
        navigate("/");
      }
    },
    // fetch data only when the user is on this page
    shouldFetch: true,
  });
  const onSelectBoard = useCallback(
    (boardId: string) => {
      sessionStorage.setItem("boardId", boardId);
      navigate("/");
    },
    [navigate]
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
            <VStack>
              <StyledTextWrapper>
                <SmallText>Name</SmallText>
              </StyledTextWrapper>
              <TextInput
                value={name}
                onChange={setName}
                validate={(v) => ValidationUtil.require(v)}
              />
            </VStack>
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
      {isLoading ? (
        <SmallText>...Loading</SmallText>
      ) : (
        <BoardWrapper>
          <VStack gap={50} align="center">
            <LargeText bold>Select Your Board</LargeText>
            <VStack gap={40} align="center">
              <Button width={220} onClick={() => setShowModal(true)}>
                + Add a new board
              </Button>
              <VStack gap={24}>
                <BoardList>
                  {data?.map((v, index) => (
                    <div key={index} style={{ margin: 20 }}>
                      <Panel
                        width={280}
                        height={100}
                        onClick={() => onSelectBoard(v.boardId)}
                      >
                        <VStack align="left" gap={18}>
                          <MediumText>{v.name}</MediumText>
                          <SmallText color={colors.mutedGraphite}>
                            Created {moment(v.createdDatetime).fromNow()}
                          </SmallText>
                        </VStack>
                      </Panel>
                    </div>
                  ))}
                </BoardList>
              </VStack>
            </VStack>
          </VStack>
        </BoardWrapper>
      )}
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

const Panel = styled.div<{
  width: number | string;
  height: number | string;
}>`
  display: flex;
  justify-content: center;
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  height: ${(p) => (typeof p.height === "number" ? `${p.height}px` : p.height)};
  padding: 20px;
  border: 1px solid ${colors.foggyGray};
  border-radius: 8px;
  &:hover {
    background-color: ${colors.purple7};
    border-color: ${colors.purple2};
    cursor: pointer;
  }
  &:active {
    background-color: ${colors.purple2};
  }
`;

const StyledTextWrapper = styled.div`
  text-align: left;
  padding: 0 0 8px 8px;
`;
