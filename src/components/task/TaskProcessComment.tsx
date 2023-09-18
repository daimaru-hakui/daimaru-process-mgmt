import { Container, Flex, Heading } from '@chakra-ui/react';
import TaskProcessCommentCreate from './TaskProcessCommentCreate';
import { Task } from '../../../types';
import { FC } from "react";
import TaskProcessCommentList from './TaskProcessCommentList';
import { PROCESS_LIST } from '../../utils/constants';
import { useColors } from '../../hooks/useColors';

type Props = {
  task: Task;
};

const TaskProcessComment: FC<Props> = ({ task }) => {
  const { bgPrimaryColor } = useColors();
  return (
    <Container p={6} bg={bgPrimaryColor} rounded="md" shadow="md" maxW={1000}>
      <Flex justify="space-between" align="center">
        <Heading as="h2" fontSize="2xl">
          各工程コメント
        </Heading>
        <TaskProcessCommentCreate taskId={task.id} />
      </Flex>
      {PROCESS_LIST.map((process) => (
        <TaskProcessCommentList key={process.name} taskId={task.id} processName={process.name} />
      ))}
    </Container>
  );
};

export default TaskProcessComment;