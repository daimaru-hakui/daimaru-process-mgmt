import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useColors } from '../../hooks/useColors';
import TaskScheduleEdit from './TaskScheduleEdit';
import { Task } from '../../../types';
import { FC } from "react";

type Props = {
  task: Task;
};

const TaskSchedule: FC<Props> = ({ task }) => {
  const { bgPrimaryColor } = useColors();

  return (
    <Container maxW={1000} p={6} bg={bgPrimaryColor} rounded="md" shadow="md">
      <Flex justify="space-between">
        <Heading as="h2" fontSize="2xl">生産スケジュール</Heading>
        <TaskScheduleEdit task={task} />
      </Flex>
      <Flex mt={6} direction={{ base: "column", md: "row" }} gap={6}>
        <Box>
          <Text fontWeight="bold" fontSize="sm">開始日</Text>
          <Box>{task.startDate}</Box>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="sm">完了日</Text>
          <Box>{task.endDate}</Box>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="sm">ステータス</Text>
          <Box>{task.isCompleted ? "完了" : "未完了"}</Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default TaskSchedule;