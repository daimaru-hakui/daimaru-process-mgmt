import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Task } from '../../../types';
import TaskScheduleEdit from '../task/TaskScheduleEdit';
import TaskEdit from '../task/TaskEdit';

type Props = {
  task: Task;
};

const GanttProductionChartLabel: FC<Props> = ({ task }) => {
  return (
    <Flex
      w="100%"
      h={16}
      pr={6}
      align="center"
      justify="space-between"
      fontSize="xs"
    >
      <Flex ml={3} direction="column" justify="flex-start">
        <Text >{task.serialNumber}</Text>
        {/* <Text >{task.processNumber}</Text> */}

        <Flex>
          <Text >{task.productNumber}</Text>
          <Text >{task.productName}</Text>
        </Flex>
        <Flex gap={6}>
          <Box>納期<Box as="span" ml={1}>{task.salesDay}</Box></Box>
          <Box>数量<Box as="span" ml={1}>{task.quantity}</Box></Box>
        </Flex>
      </Flex>
      <Flex direction="column" gap={2}>
        <TaskScheduleEdit task={task} fontSize={18} />
        <TaskEdit task={task} fontSize={18} />
      </Flex>
    </Flex>
  );
};

export default GanttProductionChartLabel;