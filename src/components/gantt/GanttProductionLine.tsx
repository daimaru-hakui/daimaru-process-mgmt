import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { useUtils } from '../../hooks/useUtils';

type Props = {
  startPoint: number;
  endPoint: number;
  startDate: number;
  endDate: number;
};

const GanttProductionLine: FC<Props> = ({ startPoint, endPoint, startDate, endDate }) => {
  const total = endPoint - startPoint;
  const startOffset = startDate > startPoint ? (startDate - startPoint) / total * 100 : 0;
  const endOffset = (endDate - startPoint) / total * 100;
  const offsetWidth = (endOffset - startOffset);
  const { dateTime } = useUtils();

  return (
    <Box w="full" h={16} position="relative" zIndex={1} borderBottom="1px solid #e5e5e5" overflow="hidden">
      <Box
        w={`${offsetWidth}%`}
        h="70%"
        bg="gray"
        position="absolute"
        top="50%"
        left={`${startOffset}%`}
        transform="translateY(-50%)"
        boxShadow="md"
      >
        <Box
          color="white"
          position="absolute"
          top={0}
          left={2}
        >
          {dateTime(startDate) || ""}
        </Box>
        <Box
          color="white"
          position="absolute"
          bottom={0}
          left={2}
        >
          {dateTime(endDate) || ""}
        </Box>
      </Box>
    </Box>
  );
};

export default GanttProductionLine;