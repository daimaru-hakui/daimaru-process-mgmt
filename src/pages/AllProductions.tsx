import { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useColors } from '../hooks/useColors';
import GanttProductionChart from '../components/gantt/GanttProductionChart';
import { useUtils } from '../hooks/useUtils';
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from '../../firebase';
import { Task } from '../../types';
import { useStore } from '../../store';
import AllTasksSearchBar from '../components/task/AllTasksSearchBar';

const AllProductions = () => {
  const { bgPrimaryColor } = useColors();
  const { animationOpacity } = useUtils();
  const [tasks, setTasks] = useState<Task[]>([]);
  const searchText = useStore((state) => state.searchText);
  const setSearchText = useStore((state) => state.setSearchText);
  const searchStaff = useStore((state) => state.searchStaff);
  const setSearchStaff = useStore((state) => state.setSearchStaff);
  const searchDate = useStore((state) => state.searchDate);
  const resetSearchDate = useStore((state) => state.resetSearchDate);
  const filterTasks = useStore((state) => state.filterTasks);
  const setFilterTasks = useStore((state) => state.setFilterTasks);

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
  }, [tasks, searchText, searchStaff, searchDate, setFilterTasks]);

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
    <Container
      p={6}
      maxW="full"
      bg={bgPrimaryColor}
      rounded="md"
      shadow="md"
      animation={animationOpacity}
    >
      <Heading as="h2" fontSize="2xl">生産スケジュール</Heading>
      <Box>
        <AllTasksSearchBar onReset={onReset} />
        <GanttProductionChart filterTasks={filterTasks} />
      </Box>
    </Container >
  );
};

export default AllProductions;