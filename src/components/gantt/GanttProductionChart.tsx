import { Box, Flex } from "@chakra-ui/react";
import GanttProductionLine from "./GanttProductionLine";
import { FC, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Task } from "../../../types";
import GanttProductionLabel from "./GanttProductionLabel";
import { useUtils } from "../../hooks/useUtils";
import { useColors } from "../../hooks/useColors";

type Props = {
  start: string;
  end: string;
};

const GanttProductionChart: FC<Props> = ({ start, end }) => {
  const { bgPrimaryColor } = useColors();
  const startPoint = new Date(start).getTime();
  const endPoint = new Date(end).getTime();
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { dateArray } = useUtils();
  const dateList = dateArray(start, end);

  useEffect(() => {
    const dayCount = () => {
      const elapsedTime = endPoint - startPoint;
      const numberOfDays = elapsedTime / 1000 / 60 / 60 / 24;
      setNumberOfDays(numberOfDays);
    };
    dayCount();
  }, [startPoint, endPoint]);

  useEffect(() => {
    const getTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        orderBy("createdAt", "desc"),
        where("isCompleted", "==", false)
      );
      onSnapshot(q, (snapshot) =>
        setTasks(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Task))
        )
      );
    };
    getTasks();
  }, []);

  return (
    <Box
      overflow="auto"
      h={{ base: "calc(100vh - 15rem)", md: "calc(100vh - 18rem)" }}
    >
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

      <Flex
        w="full"
        minW={`${numberOfDays * 30}px`}
      >
        <Box w="300px">
          {tasks.map((task) => (
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
          {tasks.map((task) => (
            <GanttProductionLine
              key={task.id}
              startPoint={startPoint}
              endPoint={endPoint}
              startDate={new Date(task.startDate).getTime()}
              endDate={new Date(task.endDate).getTime()}
            />
          ))}
          {[...Array(numberOfDays)].map((_: string, index: number) => (
            <Box
              key={index}
              h={`${tasks.length * 4}rem `}
              position="absolute"
              borderLeft={"1px solid #e5e5e5"}
              top={0}
              bottom={0}
              left={`${(100 / numberOfDays) * index}%`}
              bg="#f4f4f4"
            ></Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default GanttProductionChart;
