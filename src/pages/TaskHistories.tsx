import {
  Container,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { useColors } from "../hooks/useColors";
import { useUtils } from "../hooks/useUtils";
import AllTasksTable from "../components/task/AllTasksTable";

const TaskHistories = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const { bgPrimaryColor, btnTextPrimaryColor } = useColors();
  const { animationOpacity } = useUtils();

  useEffect(() => {
    const getTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        orderBy("createdAt", "desc"),
        where("isCompleted", "==", true)
      );
      onSnapshot(q, (snapshot) =>
        setTasks(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Task))
        )
      );
    };
    getTasks();
  }, []);

  useEffect(() => {
    const createCSV = () => {
      setCsvData(
        tasks.map((task) => ({
          "No.": task.id,
          " 加工指示書NO.": task.processNumber,
          商品名: task.productName,
          サイズ明細: task.sizeDetails,
          数量: task.quantity,
          コメント: task.comment,
          受付時間: format(
            new Date(task.createdAt.toDate()),
            "yyyy年MM月dd日 HH時mm分ss秒"
          ),
        }))
      );
    };
    createCSV();
  }, [tasks]);

  return (
    <Container p={6} maxW={1800} bg={bgPrimaryColor} rounded="md" shadow="md" animation={animationOpacity}>
      <Flex justify="space-between">
        <Heading as="h2" fontSize="2xl">
          加工指示書完了履歴
        </Heading>
        <Flex gap={3} display={{ base: "none", md: "flex" }}>
          <CSVLink data={csvData} filename={"加工指示書一覧.csv"}>
            <Button>CSV</Button>
          </CSVLink>
          <Link to="/dashboard/add-task">
            <Button colorScheme="yellow" color={btnTextPrimaryColor}>
              追加
            </Button>
          </Link>
        </Flex>
      </Flex>
      <AllTasksTable tasks={tasks} />
    </Container>
  );
};

export default TaskHistories;
