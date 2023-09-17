import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import TaskProcessCommentForm from './TaskProcessCommentForm';
import { FC } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { Comment } from '../../../types';
import { useColors } from '../../hooks/useColors';

type Props = {
  comment: Comment;
  taskId: string,
};

const TaskProcessCommentEdit: FC<Props> = ({ comment, taskId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgPrimaryColor } = useColors();

  const defaultValues = {
    taskId: taskId,
    id: comment.id,
    processName: comment.processName,
    content: comment.content,
    images: comment.images
  };

  return (
    <>
      <AiOutlineEdit cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgPrimaryColor}>
          <ModalHeader>コメント</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskProcessCommentForm
              onClose={onClose}
              defaultValues={defaultValues}
              pageType='EDIT'
            />
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

export default TaskProcessCommentEdit;