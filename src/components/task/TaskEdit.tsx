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
import { useColors } from '../../hooks/useColors';

type Props = {
  task: Task;
  fontSize?: number;
};

const TaskEdit: FC<Props> = ({ task, fontSize = 22 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgPrimaryColor } = useColors();
  return (
    <>
      <AiOutlineEdit cursor="pointer" onClick={onOpen} fontSize={fontSize} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgPrimaryColor}>
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