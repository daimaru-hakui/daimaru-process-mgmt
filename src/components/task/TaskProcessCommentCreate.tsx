import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import TaskProcessCommentForm from './TaskProcessCommentForm';
import { FC } from 'react';
import { useColors } from '../../hooks/useColors';

type Props = {
  taskId: string;
};

const TaskProcessCommentCreate: FC<Props> = ({ taskId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgPrimaryColor, btnTextPrimaryColor } = useColors();

  const defaultValues = {
    id: "",
    taskId: taskId,
    processName: "",
    content: "",
    images: []
  };

  return (
    <>
      <Button colorScheme='yellow' color={btnTextPrimaryColor} onClick={onOpen}>コメント</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgPrimaryColor}>
          <ModalHeader>コメント</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskProcessCommentForm
              onClose={onClose}
              defaultValues={defaultValues}
              pageType='NEW' />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskProcessCommentCreate;