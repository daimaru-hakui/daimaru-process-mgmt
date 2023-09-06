import { Box, Container, Flex, Heading, Input } from '@chakra-ui/react';
import { useColors } from '../hooks/useColors';
import GanttProductionChart from '../components/gantt/GanttProductionChart';
import { useState } from 'react';

const AllProductions = () => {
  const { bgPrimaryColor } = useColors();
  const [date, setDate] = useState({ startDate: currentDate(), endDate: threeMonthsLater() });

  function currentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const mounthStr = ("0" + month).slice(-2);
    const day = date.getDate();
    const dayStr = ("0" + day).slice(-2);
    return `${year}-${mounthStr}-${dayStr}`;
  }

  function threeMonthsLater() {
    const dt = new Date();
    const year = dt.getFullYear();
    dt.setMonth(dt.getMonth() + 1);
    const month = dt.getMonth() + 1;
    const mounthStr = ("0" + month).slice(-2);
    const day = dt.getDate();
    const dayStr = ("0" + day).slice(-2);
    return `${year}-${mounthStr}-${dayStr}`;
  }

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "startDate") {
      const start = new Date(value).getTime();
      const end = new Date(date.endDate).getTime();
      if (start > end) {
        setDate({ [name]: value, endDate: value });
        return;
      }
    }

    if (name === "endDate") {
      const start = new Date(date.startDate).getTime();
      const end = new Date(value).getTime();
      if (start > end) {
        setDate({ startDate: value, [name]: value });
        return;
      }
    }

    setDate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Container p={6} mb={16} maxW={1800} bg={bgPrimaryColor} rounded="md" shadow="md">
      <Heading as="h2" fontSize="2xl">生産スケジュール</Heading>
      <Box>
        <GanttProductionChart start={date.startDate} end={date.endDate} />
      </Box>
      <Flex
        w="full"
        p={3}
        justify="center"
        gap={6}
        position="fixed"
        left={0}
        bottom={0}
        zIndex={10}
        bg={"#051e34"}
        boxShadow="0 0px 5px 3px rgba(0,0,0,0.1)"
      >
        <Box>
          <Input type="date" name="startDate" value={date.startDate} onChange={handleChangeDate} bg="#e5e5e5" />
        </Box>
        <Box>
          <Input type="date" name="endDate" value={date.endDate} onChange={handleChangeDate} bg="#e5e5e5" />
        </Box>
      </Flex >

    </Container >
  );
};

export default AllProductions;