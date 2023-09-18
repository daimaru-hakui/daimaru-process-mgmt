import { FC } from 'react';
import { Task } from '../../../types';
import { Box } from '@chakra-ui/react';

type Props = {
  filterTasks: Task[];
  numberOfDays: number;
};

const GanttProductionChartBorder: FC<Props> = ({
  filterTasks,
  numberOfDays
}) => {
  return (
    <>
      {[...Array(numberOfDays)].map((_: string, index: number) => (
        <Box
          key={index}
          h={`${filterTasks.length * 4}rem `}
          position="absolute"
          borderLeft={"1px solid #e5e5e5"}
          top={0}
          bottom={0}
          left={`${(100 / numberOfDays) * index}%`}
          bg="#f4f4f4"
        ></Box>
      ))}
    </>
  );
};

export default GanttProductionChartBorder;