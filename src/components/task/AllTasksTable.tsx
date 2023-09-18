import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { Task } from "../../../types";
import { FC } from "react";
import AlltasksTableRow from "./AlltasksTableRow";
import { useColors } from "../../hooks/useColors";

type Props = {
  tasks: Task[];
};

const AllTasksTable: FC<Props> = ({ tasks }) => {
  const { bgPrimaryColor } = useColors();
  return (

    <>
      {tasks.length !== 0 ? (
        <TableContainer w="full" p={0} mt={3} overflowX="unset" overflowY="unset">
          <Box
            overflow="auto"
            maxH={{ base: "calc(100vh - 195px)", md: "calc(100vh - 340px)" }}
            w="full"
          >
            <Table variant="simple" size="sm">
              <Thead position="sticky" top={0} zIndex="docked" bg={bgPrimaryColor}>
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
                  <AlltasksTableRow key={task.id} task={task} />
                ))}
              </Tbody>
            </Table>
          </Box>
        </TableContainer>
      ) : <Box w="full" py={16} textAlign="center">検索結果はありません。</Box>}
    </>
  );
};

export default AllTasksTable;