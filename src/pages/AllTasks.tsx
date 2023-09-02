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
} from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { Task } from '../../types';
import TimeToCalc from '../components/TimeToCalc';


const AllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const q = query(collection(db, "tasks"), orderBy("createdAt"));
      onSnapshot(q, (snapshot) => (
        setTasks(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Task
        )))
      ));
    };
    getTasks();
  }, []);

  return (
    <Container p={6} maxW={1800} bg="white" rounded="md" shadow="md">
      <Heading as="h2" fontSize="2xl">タスク一覧</Heading>
      <TableContainer w="full" p={0} mt={6}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>NO.</Th>
              <Th>加工指示書No.</Th>
              <Th>顧客様名</Th>
              <Th>商品名</Th>
              <Th>サイズ明細</Th>
              <Th>数量</Th>
              <Th>コメント</Th>
              <Th>受付時間</Th>
              <Th>パターン準備</Th>
              <Th>裁断</Th>
              <Th>資材準備</Th>
              <Th>縫製加工</Th>
              <Th>仕上げ</Th>
              <Th>倉庫入荷</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Tr key={task.id}>
                <Td>{task.serialNumber}</Td>
                <Td>{task.processNumber}</Td>
                <Td>{task.customer}</Td>
                <Td>{task.productName}</Td>
                <Td>{task.sizeDetails}</Td>
                <Td>{task.quantity}</Td>
                <Td>{task.comment}</Td>
                <Td>
                  <TimeToCalc prop={task.reception} />
                </Td>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllTasks;