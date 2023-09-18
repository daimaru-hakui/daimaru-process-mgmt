import { useEffect, useState } from "react";
import { Task } from "../../types";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import GanttChart from "../components/gantt/GanttChart";
import TaskSchedule from "../components/task/TaskSchedule";
import TaskMeasureComment from "../components/task/TaskProcessComment";
import TaskContent from "../components/task/TaskContent";
import { useUtils } from "../hooks/useUtils";
import { Stack } from "@chakra-ui/react";
import { useStore } from "../../store";
import TaskNextPrev from "../components/task/TaskNextPrev";

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task>();
  const [nextId, setNextId] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<string | null>(null);
  const filterTasks = useStore((state) => state.filterTasks);
  const { animationOpacity } = useUtils();

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

  useEffect(() => {
    if (!filterTasks) return;
    const index = filterTasks?.findIndex((task) => (task.id === id));
    if (index === undefined || index === null) return;
    const totalNumberOfPages = filterTasks?.length || 0;
    const prevPageIdx = (index + 1 < totalNumberOfPages) ? (index + 1) : null;
    const nextPageIdx = (index - 1 >= 0) ? index - 1 : null;
    if (prevPageIdx) {
      setPrevId(filterTasks[prevPageIdx].id);
    } else {
      setPrevId(null);
    }
    if (nextPageIdx) {
      setNextId(filterTasks[nextPageIdx].id);
    } else {
      setNextId(null);
    }
  }, [filterTasks, id]);

  if (!task) return;

  return (
    <Stack spacing={{ base: 3, md: 6 }} p={0} pb={{ base: 12, md: 0 }} animation={animationOpacity}>
      <TaskNextPrev nextId={nextId} prevId={prevId} isCompleted={task.isCompleted} />
      <TaskSchedule task={task} />
      <TaskContent task={task} />
      <GanttChart task={task} />
      <TaskMeasureComment task={task} />
    </Stack>
  );
};

export default Task;
