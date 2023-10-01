import { Flex, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useUtils } from "../../hooks/useUtils";

type Props = {
  startPoint: number;
  endPoint: number;
  startTime: any;
  endTime: any;
  elapsedTime: number;
  color: string;
};

const GanttLine: FC<Props> = ({
  startPoint,
  endPoint,
  startTime,
  endTime,
  elapsedTime,
  color,
}) => {
  const [flag, setFlag] = useState(false);
  const { formatTime, timeCalc } = useUtils();
  const total = +endPoint - startPoint;
  const startbar = ((+startTime - startPoint) / total) * 100;
  const endbar = ((endTime - startPoint) / total) * 100;
  const width = endbar - startbar;

  return (
    <Flex
      w="100%"
      h={10}
      position="relative"
      align="center"
      borderBottom="1px solid #e5e5e5"
    >
      <Flex
        w="full"
        h="100%"
        left={0}
        position="absolute"
        justify="center"
        align="center"
        bg="gray.100"
        opacity={flag ? 1 : 0}
        transition="opacity 0.5s"
        shadow="md"
      >
        <Flex color="black" gap={6}>
          <Text>Start:{startTime && formatTime(startTime?.toDate())}</Text>
          <Text>End:{endTime && formatTime(endTime?.toDate())}</Text>{" "}
        </Flex>
      </Flex>
      <Flex
        w={`${width}%`}
        h="70%"
        position="absolute"
        left={`${startbar}%`}
        justify="center"
        align="center"
        bg={color}
        opacity={flag ? 0 : 1}
        transition="opacity 0.5s"
        cursor="pointer"
        shadow="md"
        onMouseEnter={() => setFlag(true)}
        onMouseLeave={() => setFlag(false)}
      >
        <Text color="white" textShadow="2xl" whiteSpace="nowrap">
          {timeCalc(elapsedTime)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default GanttLine;
