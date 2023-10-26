import { FC, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import GanttProductionLine from "./GanttProductionChartLine";
import { Task } from "../../../types";
import GanttProductionLabel from "./GanttProductionChartLabel";
import GanttProductionChartBorder from "./GanttProductionChartBorder";
import GanttProductionChartHeader from "./GanttProductionChartHeader";
import GanttProductionTerm from "./GanttProductionChartTerm";
import { useUtils } from "../../hooks/useUtils";

type Props = {
  filterTasks: Task[];
};

const GanttProductionChart: FC<Props> = ({ filterTasks }) => {
  const { currentDate, threeMonthsLater } = useUtils();
  const [termDate, setTermDate] =
    useState({ startDate: currentDate(), endDate: threeMonthsLater() });
  const startPoint = new Date(termDate.startDate).getTime();
  const endPoint = new Date(termDate.endDate).getTime();
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    const dayCount = () => {
      const elapsedTime = endPoint - startPoint;
      const numberOfDays = elapsedTime / 1000 / 60 / 60 / 24;
      setNumberOfDays(numberOfDays);
    };
    dayCount();
  }, [startPoint, endPoint]);

  return (
    <>
      {filterTasks.length !== 0 ? (
        <Box
          overflow="auto"
          mt={0}
          maxH={{ base: "calc(100vh - 14.8rem)", md: "calc(100vh - 23rem)" }}
        >
          <GanttProductionTerm termDate={termDate} setTermDate={setTermDate} />
          <GanttProductionChartHeader
            numberOfDays={numberOfDays}
            start={termDate.startDate}
            end={termDate.endDate}
          />
          <Flex w="full" minW={`${numberOfDays * 30}px`}>
            <Box w="300px">
              {filterTasks.map((task) => (
                <GanttProductionLabel key={task.id} task={task} />
              ))}
            </Box>
            <Box
              w="full"
              position="relative"
              border="1px solid #e5e5e5"
              borderBottom="0"
              borderLeft="0"
            >
              {filterTasks.map((task) => (
                <GanttProductionLine
                  key={task.id}
                  startPoint={startPoint}
                  endPoint={endPoint}
                  startDate={new Date(task.startDate).getTime()}
                  endDate={new Date(task.endDate).getTime()}
                />
              ))}
              <GanttProductionChartBorder filterTasks={filterTasks} numberOfDays={numberOfDays} />
            </Box>
          </Flex>
        </Box>
      ) : <Box w="full" py={24} textAlign="center">検索結果はありません。</Box>}
    </>
  );
};

export default GanttProductionChart;
