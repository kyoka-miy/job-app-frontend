import { useState } from "react";
import {
  MediumText,
  Modal,
  SmallText,
  Button,
  VStack,
  TextInput,
} from "../../common";
import { colors } from "../../common/styles";
import { ValidationUtil } from "../../common/utils/validation";
import { usePost } from "../../common/hooks";
import { CONSTANTS } from "../../constants";
import { BoardDto } from "../../api-interface/board";

type Props = {
  onClose: () => void;
  initBoard?: BoardDto | null;
  refetch?: () => void;
};
export const BoardDetailModal = ({ onClose, initBoard, refetch }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [name, setName] = useState<string>(initBoard ? initBoard.name : "");

  const { doPost, isLoading: postIsLoading } = usePost({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: () => {
      onClose();
      refetch && refetch();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });
  const { doPost: updateBoard } = usePost({
    url: CONSTANTS.ENDPOINT.BOARD(initBoard ? initBoard.boardId : ""),
    method: "PUT",
    onSuccess: () => {
      onClose();
      refetch && refetch();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  return (
    <Modal onClose={onClose}>
      <VStack gap={40} align="center">
        <MediumText bold>{initBoard ? "Update Board" : "Add Board"}</MediumText>
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
        {initBoard ? (
          <Button
            disabled={!ValidationUtil.require(name)}
            loading={postIsLoading}
            onClick={() => updateBoard({ name: name })}
            width={100}
            bold
          >
            Save
          </Button>
        ) : (
          <Button
            disabled={!ValidationUtil.require(name)}
            loading={postIsLoading}
            onClick={() => doPost({ name: name })}
            width={100}
            plusIcon
            bold
          >
            Add
          </Button>
        )}
      </VStack>
    </Modal>
  );
};
