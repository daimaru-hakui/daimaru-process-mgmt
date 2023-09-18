import { Box, Flex, Input } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useColors } from '../../hooks/useColors';
import { useUtils } from '../../hooks/useUtils';

type Props = {
  termDate: { startDate: string, endDate: string; };
  setTermDate: (payload: { startDate: string, endDate: string; }) => void;
};

const GanttProductionChartTerm: FC<Props> = ({
  termDate,
  setTermDate
}) => {
  const { bgPrimaryColor } = useColors();
  const { currentDate } = useUtils();

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name || currentDate();
    const value = e.target.value || currentDate();

    if (name === "startDate") {
      const start = new Date(value).getTime();
      const end = new Date(termDate.endDate).getTime();
      if (start > end) {
        setTermDate({ [name]: value, endDate: value });
        return;
      }
    }

    if (name === "endDate") {
      const start = new Date(termDate.startDate).getTime();
      const end = new Date(value).getTime();
      if (start > end) {
        setTermDate({ startDate: value, [name]: value });
        return;
      }
    }

    setTermDate(
      { ...termDate, [name]: value }
    );
  };

  return (
    <Flex
      w="full"
      h={14}
      justify="center"
      align="center"
      gap={6}
      position="fixed"
      left={0}
      bottom={0}
      zIndex={10}
      bg={"#051e34"}
      boxShadow="0 0px 5px 3px rgba(0,0,0,0.1)"
    >
      <Box>
        <Input type="date" name="startDate" value={termDate.startDate} onChange={handleChangeDate} bg={bgPrimaryColor} />
      </Box>
      <Box>
        <Input type="date" name="endDate" value={termDate.endDate} onChange={handleChangeDate} bg={bgPrimaryColor} />
      </Box>
    </Flex >
  );
};

export default GanttProductionChartTerm;