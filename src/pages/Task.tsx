import { useEffect, useState } from "react";
import { Task } from "../../types";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import GanttChart from "../components/gantt/GanttChart";
import TaskSchedule from "../components/task/TaskSchedule";
import TaskMeasureComment from "../components/task/TaskProcessComment";
import TaskContent from "../components/task/TaskContent";

const Task = () => {
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



  if (!task) return;

  return (
    <>
      <TaskSchedule task={task} />
      <TaskContent task={task} />
      <GanttChart task={task} />
      <TaskMeasureComment task={task} />
    </>
  );
};

export default Task;
