import {
  Container,
  Heading,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useStore } from "../../store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useColors } from '../hooks/useColors';

const Admin = () => {
  const users = useStore((state) => state.users);
  const { bgPrimaryColor } = useColors();

  const handleChangeSwitch = (
    e: React.ChangeEvent<HTMLInputElement>,
    uid: string) => {
    const value = e.target.checked;
    const name = e.target.name;
    updateUser(value, name, uid);
  };

  const updateUser = async (value: boolean, name: string, uid: string) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      [name]: value
    });
  };

  return (
    <Container
      p={6}
      w="full"
      maxW={1200}
      bg={bgPrimaryColor}
      rounded="md"
      shadow="md"
    >
      <Heading as="h2" fontSize="2xl">権限管理</Heading>
      <TableContainer w="full" p={0} m={0}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>名前</Th>
              <Th>Email</Th>
              <Th>管理者権限</Th>
              <Th>徳島工場</Th>
              <Th>営業部</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Switch
                    name="isAdmin"
                    defaultChecked={user.isAdmin}
                    onChange={(e) => handleChangeSwitch(e, user.id)}
                  />
                </Td>
                <Td>
                  <Switch
                    name="isTokushima"
                    defaultChecked={user.isTokushima}
                    onChange={(e) => handleChangeSwitch(e, user.id)}
                  />
                </Td>
                <Td>
                  <Switch
                    name="isSales"
                    defaultChecked={user.isSales}
                    onChange={(e) => handleChangeSwitch(e, user.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container >
  );
};

export default Admin;