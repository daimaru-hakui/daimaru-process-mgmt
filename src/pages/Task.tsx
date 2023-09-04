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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useStore } from "../../store";
import GanttChart from "../components/GanttChart";

// import PieChart from "../components/PieChart";


const Task = () => {
  const staffs = useStore((state) => state.staffs);
  const bg = useColorModeValue("white", "gray.700");
  const [task, setTask] = useState<Task>();
  const { id } = useParams();

  useEffect(() => {
    const getTask = async (id: string) => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      setTask({ ...docSnap.data(), id: docSnap.id } as Task);
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
    <Container p={6} bg={bg} rounded="md" shadow="md" maxW={1000}>
      <Flex justify="space-between">
        <Heading as="h2" fontSize="2xl">
          詳細
        </Heading>
      </Flex>
      <Box mt={6}>
        <Stack spacing={6}>
          <Box>
            <Text fontWeight="bold">No.</Text>
            <Box ml={1}>{task.id}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">加工指示書No.</Text>
            <Box ml={1}>{task.processNumber}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">担当者</Text>
            <Box ml={1}>{getStaffName(task.staffId)}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">顧客名</Text>
            <Box ml={1}>{task.customer}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">品番</Text>
            <Box ml={1}>{task.productNumber}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">商品名</Text>
            <Box ml={1}>{task.productName}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">サイズ明細</Text>
            <Box ml={1}>{task.sizeDetails}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">数量</Text>
            <Box ml={1}>{task.quantity}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">コメント</Text>
            <Box ml={1}>{task.comment}</Box>
          </Box>
          <Box>
            <Text fontWeight="bold">チャート</Text>
            <GanttChart task={task} />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Task;
