import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import TaskEdit from "../../components/task/TaskEdit";
import { useUtils } from "../../hooks/useUtils";
import { Task } from "../../../types";
import { FC } from "react";
import { useStore } from "../../../store";
import { useColors } from "../../hooks/useColors";

type Props = {
  task: Task;
};

const TaskContent: FC<Props> = ({ task }) => {
  const { bgPrimaryColor } = useColors();
  const { formatTime } = useUtils();
  const staffs = useStore((state) => state.staffs);

  const getStaffName = (id: string) => {
    if (!id) return "";
    const newStaff = staffs.find((staff) => staff.id === id);
    if (!newStaff) return "";
    return newStaff.name;
  };

  return (
    <Container p={6} bg={bgPrimaryColor} rounded="md" shadow="md" maxW={1000}>
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
                {!task.cmtCoefficient ? "未入力" : `×${task.cmtCoefficient}`}
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
                {task.sp ? `${task.sp}円` : "未入力"}
              </Box>
            </Box>
            <Box minW={150}>
              <Text fontWeight="bold" fontSize="sm">
                CP価格
              </Text>
              <Box ml={1} minH={6}>
                {task.cp}円
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
      </Box>
    </Container>
  );
};

export default TaskContent;