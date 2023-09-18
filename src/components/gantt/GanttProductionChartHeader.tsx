import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useColors } from '../../hooks/useColors';
import { useUtils } from '../../hooks/useUtils';

type Props = {
  numberOfDays: number;
  start: string;
  end: string;
};

const GanttProductionChartHeader: FC<Props> = ({
  numberOfDays,
  start,
  end
}) => {
  const { bgPrimaryColor } = useColors();
  const { dateArray } = useUtils();
  const dateList = dateArray(start, end);
  return (
    <Flex
      w="full"
      minW={`${numberOfDays * 30}px`}
      h={12}
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bgPrimaryColor}
    >
      <Box w="300px"></Box>
      <Box w="full" position="relative">
        {dateList.map((date, index) => (
          <Flex
            key={index}
            w={`${100 / numberOfDays}%`}
            direction="column"
            align="center"
            position="absolute"
            top={0}
            left={`${(100 / numberOfDays) * index}%`}
            display={dateList.length === index + 1 ? "none" : "flex"}
            whiteSpace="nowrap"
          >
            <Box h={6}>
              {index === 0 || date.date === 1 ? `${date.moonth}月` : ""}
            </Box>
            <Box
              h={6}
              color={
                date.day === 0 ? "red" : date.day === 6 ? "blue" : ""
              }
            >
              {date.date}
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default GanttProductionChartHeader;