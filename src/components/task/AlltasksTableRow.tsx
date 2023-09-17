import {
  Tr,
  Td,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Task } from "../../../types";
import { FC, memo } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import TimeToCalc from "../TimeToCalc";
import TaskEdit from "./TaskEdit";
import { AiOutlineDelete } from "react-icons/ai";
import { useUtils } from "../../hooks/useUtils";
import { useStore } from "../../../store";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useColors } from "../../hooks/useColors";

type Props = {
  task: Task;
};

const AlltasksTableRow: FC<Props> = memo(({ task }) => {
  const { showToast } = useUtils();
  const { btnTextPrimaryColor } = useColors();
  const staffs = useStore((state) => state.staffs);

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

  const getStaffName = (id: string) => {
    if (!id) return "";
    const newStaff = staffs.find((staff) => staff.id === id);
    if (!newStaff) return "";
    return newStaff.name;
  };

  return (
    <Tr
      key={task.id}
    >
      <Td>
        <Link to={`/dashboard/all-tasks/${task.id}`}>
          <Button size="xs" colorScheme="yellow" color={btnTextPrimaryColor}>
            詳細
          </Button>
        </Link>
      </Td>
      <Td>{task.id}</Td>
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
  );
});

export default AlltasksTableRow;