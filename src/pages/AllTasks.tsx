import {
  Container,
  Heading,
  Flex,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import AllTasksTable from "../components/task/AllTasksTable";
import AllTasksSearchBar from "../components/task/AllTasksSearchBar";
import AllTasksSearchDrawer from "../components/task/AllTasksSearchDrawer";
import { useStore } from "../../store";
import { useColors } from "../hooks/useColors";

const AllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const searchText = useStore((state) => state.searchText);
  const setSearchText = useStore((state) => state.setSearchText);
  const searchStaff = useStore((state) => state.searchStaff);
  const setSearchStaff = useStore((state) => state.setSearchStaff);
  const searchDate = useStore((state) => state.searchDate);
  const resetSearchDate = useStore((state) => state.resetSearchDate);
  const [filterTasks, setFilterTasks] = useState<Task[] | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const { bgPrimaryColor, btnTextPrimaryColor } = useColors();

  useEffect(() => {
    const getTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        where("isCompleted", "==", false)
      );
      onSnapshot(q, (snapshot) =>
        setTasks(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id } as Task))
            .sort((a, b) => (+a.id < +b.id ? 1 : -1))
        )
      );
    };
    getTasks();
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      setFilterTasks(tasks.filter((task) => (
        task.id.includes(searchText) ||
        task.processNumber.includes(searchText) ||
        task.customer.includes(searchText) ||
        task.productNumber.includes(searchText) ||
        task.productName.includes(searchText)
      )).filter((task) => (
        task.staffId === searchStaff ||
        searchStaff === ""
      )).filter((task) => (
        task.salesDay >= searchDate.startDate ||
        searchDate.startDate === ""
      )).filter((task) => (
        task.salesDay <= searchDate.endDate ||
        searchDate.endDate === ""
      )));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [tasks, searchText, searchStaff, searchDate]);

  useEffect(() => {
    const createCSV = () => {
      if (!filterTasks) return;
      setCsvData(
        filterTasks.map((task) => ({
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
  }, [filterTasks]);

  const onReset = () => {
    setSearchText("");
    setSearchStaff("");
    resetSearchDate();
  };

  if (!filterTasks) {
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Container p={6} maxW={1800} bg={bgPrimaryColor} rounded="md" shadow="md">
      <Flex justify="space-between">
        <Heading as="h2" fontSize="2xl">
          加工指示書一覧
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
      <AllTasksSearchDrawer
        onReset={onReset}
      />
      <AllTasksSearchBar
        onReset={onReset}
      />
      <Box mt={3} fontSize="xs">全{tasks.length}件中{filterTasks.length}件表示</Box>
      <AllTasksTable tasks={filterTasks} />
    </Container>
  );
};

export default AllTasks;
