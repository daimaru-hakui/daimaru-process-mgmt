import { Container, Heading, useColorModeValue } from "@chakra-ui/react";
import TaskForm from "../components/TaskForm";

const AddTask = () => {
  const bg = useColorModeValue('white', 'gray.700');

  const defaultValues = {
    serialNumber: "",
    processNumber: "",
    customer: "",
    productName: "",
    sizeDetails: "",
    quantity: 0,
    comment: ""
  };

  return (
    <Container p={6} bg={bg} rounded="md" shadow="md">
      <Heading as="h2" fontSize="2xl">加工指示書登録</Heading>
      <TaskForm defaultValues={defaultValues} pageType="NEW" />
    </Container>
  );
};

export default AddTask;