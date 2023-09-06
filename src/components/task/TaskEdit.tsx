import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FC } from "react";
import { Task } from '../../../types';
import TaskForm from './TaskForm';
import { AiOutlineEdit } from "react-icons/ai";

type Props = {
  task: Task;
};

const TaskEdit: FC<Props> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AiOutlineEdit cursor="pointer" onClick={onOpen} fontSize={22} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm defaultValues={task} pageType='EDIT' onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskEdit;