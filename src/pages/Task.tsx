import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useStore } from "../../store";
import GanttChart from "../components/gantt/GanttChart";
import TaskEdit from "../components/task/TaskEdit";
import { useUtils } from "../hooks/useUtils";
import TaskSchedule from "../components/task/TaskSchedule";

// import PieChart from "../components/PieChart";

const Task = () => {
  const { formatTime } = useUtils();
  const staffs = useStore((state) => state.staffs);
  const bg = useColorModeValue("white", "gray.700");
  const [task, setTask] = useState<Task>();
  const { id } = useParams();

  useEffect(() => {
    const getTask = async (id: string) => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      onSnapshot(docRef, (snapShot) => (
        setTask({ ...snapShot.data(), id: docSnap.id } as Task
        )
      ));
    };
    if (!id) return;
    getTask(id);
  }, [id]);

  const getStaffName = (id: string) => {
    if (!id) return "";
    const newStaff = staffs.find((staff) => staff.id === id);
    if (!newStaff) return "";
    return newStaff.name;
  };

  if (!task) return;

  return (
    <>
      <TaskSchedule task={task} />
      <Container p={6} bg={bg} rounded="md" shadow="md" maxW={1000}>
        <Flex justify="space-between">
          <Heading as="h2" fontSize="2xl">
            詳細
          </Heading>
          <TaskEdit task={task} />
        </Flex>
        <Box mt={6}>
          <Stack spacing={6}>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  作成日
                </Text>
                <Box ml={1} minH={6}>
                  {formatTime(task.createdAt.toDate())}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  希望納期
                </Text>
                <Box ml={1} minH={6}>
                  {task?.salesDay}
                </Box>
              </Box>
            </Flex>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  No.
                </Text>
                <Box ml={1} minH={6}>
                  {task.id}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  加工指示書No.
                </Text>
                <Box ml={1} minH={6}>
                  {task.processNumber}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  担当者
                </Text>
                <Box ml={1} minH={6}>
                  {getStaffName(task.staffId)}
                </Box>
              </Box>
            </Flex>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  顧客名
                </Text>
                <Box ml={1} minH={6}>
                  {task.customer}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  品番
                </Text>
                <Box ml={1} minH={6}>
                  {task.productNumber}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  商品名
                </Text>
                <Box ml={1} minH={6}>
                  {task.productName}
                </Box>
              </Box>
            </Flex>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  基準加工賃
                </Text>
                <Box ml={1} minH={6}>
                  {task.standardCmt}円
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  数量係数
                </Text>
                <Box ml={1} minH={6}>
                  {task.cmtCoefficient === 0 ? "未入力" : `×${task.cmtCoefficient}`}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  加工賃（CMT）
                </Text>
                <Box ml={1} minH={6}>
                  {task.cmt}円
                </Box>
              </Box>
            </Flex>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  サイズ明細
                </Text>
                <Box ml={1} minH={6}>
                  {task.sizeDetails}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  数量
                </Text>
                <Box ml={1} minH={6}>
                  {task.quantity}
                </Box>
              </Box>
            </Flex>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  SP価格
                </Text>
                <Box ml={1} minH={6}>
                  {task.sp}
                </Box>
              </Box>
              <Box minW={150}>
                <Text fontWeight="bold" fontSize="sm">
                  CP価格
                </Text>
                <Box ml={1} minH={6}>
                  {task.cp}
                </Box>
              </Box>
            </Flex>
            <Box>
              <Text fontWeight="bold" fontSize="sm">
                コメント
              </Text>
              <Box ml={1} minH={6}>
                {task.comment}
              </Box>
            </Box>
          </Stack>
          <Box mt={12}>
            <GanttChart task={task} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Task;
