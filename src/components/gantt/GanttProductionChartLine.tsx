import { Box } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useUtils } from "../../hooks/useUtils";

type Props = {
  startPoint: number;
  endPoint: number;
  startDate: number;
  endDate: number;
};

const GanttProductionChartLine: FC<Props> = memo(({
  startPoint,
  endPoint,
  startDate,
  endDate,
}) => {
  const total = endPoint - startPoint;
  const startOffset =
    startDate > startPoint ? ((startDate - startPoint) / total) * 100 : 0;
  const endOffset = ((endDate - startPoint) / total) * 100;
  const offsetWidth = endOffset - startOffset;
  // const totalWidth = total / 1000 / 60 / 60 / 24;
  const { dateTime } = useUtils();

  return (
    <Box
      w="full"
      // w={`${totalWidth * 20}px`}
      h={24}
      position="relative"
      zIndex={1}
      borderBottom="1px solid #e5e5e5"
      overflow="hidden"
    >
      <Box
        w={`${offsetWidth}%`}
        h="70%"
        bg="#FBA1B7"
        position="absolute"
        top="50%"
        left={`${startOffset}%`}
        transform="translateY(-50%)"
        boxShadow="md"
      >
        <Box position="absolute" top={2} left={2} whiteSpace="nowrap">
          {dateTime(startDate) || ""}
        </Box>
        <Box position="absolute" bottom={2} left={2} whiteSpace="nowrap">
          {dateTime(endDate) || ""}
        </Box>
      </Box>
    </Box>
  );
});

export default GanttProductionChartLine;
