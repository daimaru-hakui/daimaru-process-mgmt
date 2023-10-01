import { FC } from "react";
import GanttLine from "./GanttLine";
import { Task } from "../../../types";
import { Box, Flex, Container } from "@chakra-ui/react";
import GanttLabel from "./GanttLabel";
import { format } from "date-fns";
import { useUtils } from "../../hooks/useUtils";
import { useColors } from "../../hooks/useColors";

type Props = {
  task: Task;
};

const GanttChart: FC<Props> = ({ task }) => {
  const { bgPrimaryColor } = useColors();
  const { timeCalc, totalDayCount } = useUtils();

  const startPointArray = [
    +task.pattern.startTime || 0,
    +task.cutting.startTime || 0,
    +task.materials.startTime || 0,
    +task.sewing.startTime || 0,
    +task.finishing.startTime || 0,
    +task.warehouse.startTime || 0
  ].filter((time) => time !== 0);
  const startPoint = Math.min(...startPointArray);

  const startTimeArray = [
    task.pattern.startTime,
    task.cutting.startTime,
    task.materials.startTime,
    task.sewing.startTime,
    task.finishing.startTime,
    task.warehouse.startTime
  ].filter((time) => time);

  const endPoint = Math.max(
    +task.pattern.endTime || 0,
    +task.cutting.endTime || 0,
    +task.materials.endTime || 0,
    +task.sewing.endTime || 0,
    +task.finishing.endTime || 0,
    +task.warehouse.endTime || 0
  );

  const endTimeArray = [
    task.pattern.endTime,
    task.cutting.endTime,
    task.materials.endTime,
    task.sewing.endTime,
    task.finishing.endTime,
    task.warehouse.endTime,
  ].filter((date) => date);

  const daysCount = totalDayCount(
    +endTimeArray[endTimeArray.length - 1]?.toDate() - Number(task.createdAt?.toDate()) || 0
  );

  if (!endPoint) return;


  return (
    <Container p={6} bg={bgPrimaryColor} rounded="md" shadow="md" maxW={1000}>
      <Box overflow="auto">
        <Box minW={900}>
          <Flex justify="space-between">
            <Box mt={1}>
              <Box fontSize="sm" fontWeight="bold">
              開始計測時間
              </Box>
              <Box as="span">
                {format(
                  new Date(startTimeArray[startTimeArray.length -1].toDate()),
                  "yyyy年MM月dd日HH時mm分ss秒"
                )}
              </Box>
            </Box>
            <Box mt={1}>
              <Box fontSize="sm" fontWeight="bold">
                実働時間
              </Box>
              {timeCalc(
                Number(endTimeArray[endTimeArray.length - 1].toDate()) - Number(startTimeArray[startTimeArray.length -1].toDate())
              )}
            </Box>
            <Box mt={1}>
              {endTimeArray && (
                <>
                  <Box fontSize="sm" fontWeight="bold">
                    最終計測時間
                  </Box>
                  <Box as="span">
                    {format(
                      new Date(endTimeArray[endTimeArray.length - 1].toDate()),
                      "yyyy年MM月dd日HH時mm分ss秒"
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Flex>
          <Flex mt={1}>
            <Box w="12%">
              <GanttLabel label="パターン" />
              <GanttLabel label="裁断" />
              <GanttLabel label="資材準備" />
              <GanttLabel label="縫製加工" />
              <GanttLabel label="仕上げ" />
              <GanttLabel label="倉庫入荷" />
            </Box>
            <Box
              border="1px solid #e5e5e5"
              borderBottom={0}
              w="full"
              position="relative"
            >
              {[...Array(daysCount)].map((_: string, index: number) => (
                <Box
                  key={index}
                  position="absolute"
                  borderLeft={index === 0 ? 0 : "0.5px solid #e5e5e5"}
                  top={0}
                  bottom={0}
                  left={`${(100 / daysCount) * index}%`}
                  bg="#f4f4f4"
                ></Box>
              ))}
              <GanttLine
                startPoint={startPoint}
                endPoint={endPoint}
                startTime={task.pattern.startTime}
                endTime={task.pattern.endTime}
                elapsedTime={task.pattern.elapsedTime}
                color="#FBA1B7"
              />
              <GanttLine
                startPoint={startPoint}
                endPoint={endPoint}
                startTime={task.cutting.startTime}
                endTime={task.cutting.endTime}
                elapsedTime={task.cutting.elapsedTime}
                color="#F0B86E"
              />
              <GanttLine
                startPoint={startPoint}
                endPoint={endPoint}
                startTime={task.materials.startTime}
                endTime={task.materials.endTime}
                elapsedTime={task.materials.elapsedTime}
                color="#F7E987"
              />
              <GanttLine
                startPoint={startPoint}
                endPoint={endPoint}
                startTime={task.sewing.startTime}
                endTime={task.sewing.endTime}
                elapsedTime={task.sewing.elapsedTime}
                color="#9ED2BE"
              />
              <GanttLine
                startPoint={startPoint}
                endPoint={endPoint}
                startTime={task.finishing.startTime}
                endTime={task.finishing.endTime}
                elapsedTime={task.finishing.elapsedTime}
                color="#4477CE"
              />
              <GanttLine
                startPoint={startPoint}
                endPoint={endPoint}
                startTime={task.warehouse.startTime}
                endTime={task.warehouse.endTime}
                elapsedTime={task.warehouse.elapsedTime}
                color="#9F91CC"
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
};

export default GanttChart;
