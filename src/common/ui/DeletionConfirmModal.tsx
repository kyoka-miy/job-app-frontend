import { Modal, VStack, HStack, Button, MediumText } from "..";

type Props = {
  onClose: () => void;
  onDelete: () => void;
};
export const DeletionConfirmModal = ({ onClose, onDelete }: Props) => {
  return (
    <Modal onClose={onClose}>
      <VStack align="center" gap={40}>
        <MediumText>Are you sure to delete this?</MediumText>
        <HStack gap={30}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="secondary" onClick={() => onDelete()}>
            Yes, Delete
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
};
