import { FC } from 'react';
import GanttLine from './GanttLine';
import { Task } from '../../types';
import { Box, Flex } from '@chakra-ui/react';
import GanttLabel from './GanttLabel';
import { format } from "date-fns";

type Props = {
  task: Task;
};

const GanttChart: FC<Props> = ({ task }) => {
  const endTime = Math.max(
    +task.pattern.endTime || 0,
    +task.cutting.endTime || 0,
    +task.materials.endTime || 0,
    +task.sewing.endTime || 0,
    +task.finishing.endTime || 0,
    +task.warehouse.endTime || 0,
  );

  const endTime1 = [
    task.pattern.endTime,
    task.cutting.endTime,
    task.materials.endTime,
    task.sewing.endTime,
    task.finishing.endTime,
    task.warehouse.endTime,
  ].filter((date) => date);


  if (!endTime) return;

  return (
    <Box overflow="auto">
      <Box minW={900}>
        <Flex justify="space-between">
          <Box mt={1} fontSize="sm">
            <Box as="span" ml={2}>
              {format(new Date(task.createdAt.toDate()), "yyyy年MM月dd日HH時mm分ss秒")}
            </Box>
          </Box>
          {endTime1 && (
            <Box mt={1} fontSize="sm">
              <Box></Box>
              <Box as="span" ml={2}>
                {format(new Date(endTime1[length].toDate()), "yyyy年MM月dd日HH時mm分ss秒")}
              </Box>
            </Box>
          )}
        </Flex>
        <Flex mt={1} bg="gray.50">
          <Box border="1px solid #f1f1f1" w="20%">
            <GanttLabel label="パターン" />
            <GanttLabel label="裁断" />
            <GanttLabel label="資材準備" />
            <GanttLabel label="縫製加工" />
            <GanttLabel label="仕上げ" />
            <GanttLabel label="倉庫入荷" />
          </Box>
          <Box border="1px solid #f1f1f1" w="full">
            <GanttLine
              startPoint={+task.createdAt}
              endPoint={endTime}
              startTime={+task.pattern.startTime}
              endTime={+task.pattern.endTime}
              elapsedTime={task.pattern.elapsedTime}
              color="#FBA1B7"
            />
            <GanttLine
              startPoint={+task.createdAt}
              endPoint={endTime}
              startTime={+task.cutting.startTime}
              endTime={+task.cutting.endTime}
              elapsedTime={task.cutting.elapsedTime}
              color="#F0B86E"
            />
            <GanttLine
              startPoint={+task.createdAt}
              endPoint={endTime}
              startTime={+task.materials.startTime}
              endTime={+task.materials.endTime}
              elapsedTime={task.materials.elapsedTime}
              color="#F7E987"
            />
            <GanttLine
              startPoint={+task.createdAt}
              endPoint={endTime}
              startTime={+task.sewing.startTime}
              endTime={+task.sewing.endTime}
              elapsedTime={task.sewing.elapsedTime}
              color="#9ED2BE"
            />
            <GanttLine
              startPoint={+task.createdAt}
              endPoint={endTime}
              startTime={+task.finishing.startTime}
              endTime={+task.finishing.endTime}
              elapsedTime={task.finishing.elapsedTime}
              color="#4477CE"
            />
            <GanttLine
              startPoint={+task.createdAt}
              endPoint={endTime}
              startTime={+task.warehouse.startTime}
              endTime={+task.warehouse.endTime}
              elapsedTime={task.warehouse.elapsedTime}
              color="#9F91CC"
            />
          </Box>
        </Flex>
      </Box>
    </Box >
  );
};

export default GanttChart;