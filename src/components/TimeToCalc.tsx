import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { useUtils } from '../hooks/useUtils';

type Props = {
  prop: any;
};


const TimeToCalc: FC<Props> = ({ prop }) => {
  const { timeCalc, formatTime } = useUtils();

  return (
    <>
      <Box>
        開始
        <Box as="span" ml={3}>
          {prop?.startTime && (
            formatTime(prop?.startTime.toDate()))}
        </Box>
      </Box>
      <Box>
      </Box>
      終了
      <Box as="span" ml={3}>
        {prop?.endTime && (
          formatTime(prop?.endTime.toDate()))}
      </Box>
      <Box>
      </Box>
      結果
      <Box as="span" ml={3} fontWeight="bold">
        {timeCalc(prop?.elapsedTime)}
      </Box>
    </>
  );
};

export default TimeToCalc;