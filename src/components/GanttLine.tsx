import { Flex, Text } from '@chakra-ui/react';
import { FC } from "react";

type Props = {
  startPoint: number;
  endPoint: number;
  startTime: number;
  endTime: number;
  elapsedTime: number;
  color: string;
};

const GanttLine: FC<Props> = ({ startPoint, endPoint, startTime, endTime, elapsedTime, color }) => {
  const total = endPoint - startPoint;
  const startbar = (startTime - startPoint) / total * 100;
  const endbar = (endTime - startPoint) / total * 100;
  const width = (endbar - startbar);

  const timeCalc = (time: any) => {
    if (time === 0) return "";
    if (time <= 0) return "失敗";
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60 % 24);
    const days = Math.floor(time / 1000 / 60 / 60 / 24 % 365);
    const daysText = (days === 0) ? "" : days + "日";
    const hoursText = (hours === 0) ? "" : hours + "時間";
    const minutesText = (minutes === 0) ? "" : minutes + "分";
    const secondsText = (seconds === 0) ? "" : seconds + "秒";
    return daysText + hoursText + minutesText + secondsText;
  };

  return (
    <Flex
      w="100%"
      h={10}
      position="relative"
      align="center"
    >
      <Flex
        w={`${width}%`}
        h="70%"
        position="absolute"
        left={`${startbar}%`}
        justify="center"
        align="center"
        bg={color}
      // border="1px solid #FFD1DA"
      >
        <Text color="white">{timeCalc(elapsedTime)}</Text>
      </Flex>
    </Flex>
  );
};

export default GanttLine;