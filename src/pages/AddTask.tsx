import { Container, Heading, useColorModeValue } from "@chakra-ui/react";
import TaskForm from "../components/task/TaskForm";

const AddTask = () => {
  const bg = useColorModeValue("white", "gray.700");

  const defaultValues = {
    serialNumber: "",
    processNumber: "",
    staffId: "",
    customer: "",
    productNumber: "",
    productName: "",
    sizeDetails: "",
    quantity: 0,
    standardCmt: 0,
    cmtCoefficient: 1,
    cmt: 0,
    sp: 0,
    cp: 0,
    salesDay: "",
    startDate: "",
    endDate: "",
    isCompleted: false,
    comment: "",
    pattern: {
      startTime: "",
      endTime: "",
      startCreateUser: "",
      endCreateUser: "",
      elapsedTime: 0,
    },
    cutting: {
      startTime: "",
      endTime: "",
      startCreateUser: "",
      endCreateUser: "",
      elapsedTime: 0,
    },
    materials: {
      startTime: "",
      endTime: "",
      startCreateUser: "",
      endCreateUser: "",
      elapsedTime: 0,
    },
    sewing: {
      startTime: "",
      endTime: "",
      startCreateUser: "",
      endCreateUser: "",
      elapsedTime: 0,
    },
    finishing: {
      startTime: "",
      endTime: "",
      startCreateUser: "",
      endCreateUser: "",
      elapsedTime: 0,
    },
    warehouse: {
      startTime: "",
      endTime: "",
      startCreateUser: "",
      endCreateUser: "",
      elapsedTime: 0,
    },
  };

  return (
    <Container p={6} bg={bg} rounded="md" shadow="md">
      <Heading as="h2" fontSize="2xl">
        加工指示書登録
      </Heading>
      <TaskForm defaultValues={defaultValues} pageType="NEW" />
    </Container>
  );
};

export default AddTask;
