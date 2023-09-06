import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Switch, Text, useDisclosure } from '@chakra-ui/react';
import { useState, FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Task } from '../../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useUtils } from '../../hooks/useUtils';

type Props = {
  task: Task;
};

const TaskScheduleEdit: FC<Props> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState({ startDate: task.startDate, endDate: task.endDate });
  const [status, setStatus] = useState(task.isCompleted);
  const { showToast } = useUtils();

  const handleChangeSwitch = () => {
    setStatus(!status);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "startDate") {
      const start = new Date(value).getTime();
      const end = new Date(date.endDate).getTime();
      if (start > end) {
        setDate({ [name]: value, endDate: value });
        return;
      }
    }

    if (name === "endDate") {
      const start = new Date(date.startDate).getTime();
      const end = new Date(value).getTime();
      if (start > end) {
        setDate({ startDate: value, [name]: value });
        return;
      }
    }

    setDate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateTaskSchedule = async (id: string) => {
    const docRef = doc(db, "tasks", id);
    try {
      await updateDoc(docRef, {
        startDate: date.startDate || "",
        endDate: date.endDate || "",
        isCompleted: status || false
      });
      showToast("更新しました。", "success");
      onClose();
    } catch (error) {
      console.log(error);
      showToast("更新に失敗しました。", "error");
    }
  };

  return (
    <>
      <AiOutlineEdit cursor="pointer" onClick={onOpen} fontSize={22} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              <Flex direction={{ base: "column", md: "row" }} gap={6}>
                <Box w="full">
                  <Text fontWeight="bold" fontSize="sm">開始日</Text>
                  <Input mt={1} type="date" name="startDate" value={date.startDate} onChange={handleChangeDate} />
                </Box>
                <Box w="full">
                  <Text fontWeight="bold" fontSize="sm">完了日</Text>
                  <Input mt={1} type="date" name="endDate" value={date.endDate} onChange={handleChangeDate} />
                </Box>
              </Flex>
              <Box>
                <Text fontWeight="bold" fontSize="sm">ステータス</Text>
                <FormControl mt={1} display='flex' alignItems='center'>
                  <FormLabel htmlFor='email-alerts' mb='0' w={16}>
                    {status ? "完了" : "未完了"}
                  </FormLabel>
                  <Switch size='lg' isChecked={status} onChange={handleChangeSwitch} />
                </FormControl>
              </Box>
            </Stack>
            <Button
              mt={12}
              w="full"
              colorScheme='yellow'
              color="white"
              onClick={() => updateTaskSchedule(task.id)}
            >
              更新
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskScheduleEdit;