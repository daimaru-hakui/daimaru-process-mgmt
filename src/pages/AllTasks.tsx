import {
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import TimeToCalc from "../components/TimeToCalc";
import TaskEdit from "../components/task/TaskEdit";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { useStore } from "../../store";

const AllTasks = () => {
  const staffs = useStore((state) => state.staffs);
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const bg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const getTasks = async () => {
      const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
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

  const deleteTask = async (id: string) => {
    const result = confirm("削除して宜しいででしょうか");
    if (!result) return;
    try {
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
      showToast("削除しました。", "success");
    } catch (error) {
      console.log(error);
      showToast("削除に失敗しました。", "error");
    }
  };

  const showToast = (
    title: string,
    status: "success" | "error",
    duration: number = 2000
  ) => {
    toast({
      title,
      status,
      duration,
      isClosable: true,
      position: "top-right",
    });
  };

  const getStaffName = (id: string) => {
    if (!id) return "";
    const newStaff = staffs.find((staff) => staff.id === id);
    if (!newStaff) return "";
    return newStaff.name;
  };

  return (
    <Container p={6} maxW={1800} bg={bg} rounded="md" shadow="md">
      <Flex justify="space-between">
        <Heading as="h2" fontSize="2xl">
          タスク一覧
        </Heading>
        <Flex gap={3}>
          <CSVLink data={csvData} filename={"加工指示書一覧.csv"}>
            <Button>CSV</Button>
          </CSVLink>
          <Link to="/dashboard/add-task">
            <Button colorScheme="yellow" color="white">
              追加
            </Button>
          </Link>
        </Flex>
      </Flex>
      <TableContainer w="full" p={0} mt={6}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>詳細</Th>
              <Th>NO.</Th>
              <Th>加工指示書No.</Th>
              <Th>受付時間</Th>
              <Th>希望納期</Th>
              <Th>担当者</Th>
              <Th>顧客様名</Th>
              <Th>品番</Th>
              <Th>商品名</Th>
              <Th>サイズ明細</Th>
              <Th>数量</Th>
              <Th>パターン準備</Th>
              <Th>裁断</Th>
              <Th>資材準備</Th>
              <Th>縫製加工</Th>
              <Th>仕上げ</Th>
              <Th>倉庫入荷</Th>
              <Th>編集/削除</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Tr key={task.id} bg={task.isCompleted ? "gray.50" : "transparent"}>
                <Td>
                  <Link to={`/dashboard/all-tasks/${task.id}`}>
                    <Button size="xs" colorScheme="yellow" color="white">
                      詳細
                    </Button>
                  </Link>
                </Td>
                <Td>{task.serialNumber}</Td>
                <Td>{task.processNumber}</Td>
                <Td>
                  {format(
                    new Date(task.createdAt.toDate()),
                    "yyyy年MM月dd日 HH時mm分ss秒"
                  )}
                </Td>

                <Td>{task.salesDay}</Td>
                <Td>{getStaffName(task.staffId)}</Td>
                <Td>{task.customer}</Td>
                <Td>{task?.productNumber}</Td>
                <Td>{task.productName}</Td>
                <Td>{task.sizeDetails}</Td>
                <Td>{task.quantity}</Td>
                <Td>
                  <TimeToCalc prop={task.pattern} />
                </Td>
                <Td>
                  <TimeToCalc prop={task.cutting} />
                </Td>
                <Td>
                  <TimeToCalc prop={task.materials} />
                </Td>
                <Td>
                  <TimeToCalc prop={task.sewing} />
                </Td>
                <Td>
                  <TimeToCalc prop={task.finishing} />
                </Td>
                <Td>
                  <TimeToCalc prop={task.warehouse} />
                </Td>
                <Td>
                  <Flex gap={4}>
                    <TaskEdit task={task} />
                    <AiOutlineDelete
                      cursor="pointer"
                      fontSize={22}
                      onClick={() => deleteTask(task.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllTasks;
