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
} from '@chakra-ui/react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { Task } from '../../types';
import TimeToCalc from '../components/TimeToCalc';
import TaskEdit from '../components/TaskEdit';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";


const AllTasks = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const bg = useColorModeValue('white', 'gray.700');
  useEffect(() => {
    const getTasks = async () => {
      const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => (
        setTasks(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Task
        )))
      ));
    };
    getTasks();
  }, []);

  const deleteTask = async (id: string) => {
    const result = confirm("削除して宜しいででしょうか");
    if (!result) return;
    try {
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
      successDeleteToast();
    } catch (error) {
      console.log(error);
      errorDeleteToast();
    }
  };

  const successDeleteToast = () => {
    toast({
      title: '削除しました。',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };


  const errorDeleteToast = () => {
    toast({
      title: "削除に失敗しました。",
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };


  return (
    <Container p={6} maxW={1800} bg={bg} rounded="md" shadow="md">
      <Flex justify="space-between">
        <Heading as="h2" fontSize="2xl">タスク一覧</Heading>
        <Link to="/dashboard/add-task">
          <Button colorScheme='yellow' color="white">追加</Button>
        </Link>
      </Flex>
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
              <Th>処理</Th>
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