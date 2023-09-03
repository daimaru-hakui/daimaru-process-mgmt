import { Box, Button, Container, Heading, Input, Stack, Text, Textarea, useColorModeValue, useToast } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "../../firebase";

type Inputs = {
  serialNumber: string,
  processNumber: string,
  customer: string;
  productName: string;
  sizeDetails: string;
  quantity: number;
  comment: string;
};

const AddTask = () => {
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    addTask(data);
  };

  const addTask = async (data: Inputs) => {
    const id = data.serialNumber.trim();
    const docRef = doc(db, "tasks", id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        errorToastExists();
        throw new Error("この番号はすでに登録済みです");
      }
      await setDoc(docRef, {
        ...data,
        serialNumber: data.serialNumber.trim(),
        quantity: +data.quantity,
        reception: { start: "", end: "" },
        pattern: { start: "", end: "" },
        cutting: { start: "", end: "" },
        materials: { start: "", end: "" },
        sewing: { start: "", end: "" },
        warehouse: { start: "", end: "" },
        createdAt: serverTimestamp()
      });
      successToast();
    } catch (error) {
      errorToast();
      console.log(error);
    } finally {
      reset();
    }
  };

  const successToast = () => {
    toast({
      title: '登録しました。',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const errorToastExists = () => {
    toast({
      title: 'この番号はすでに登録済みです。',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const errorToast = () => {
    toast({
      title: '登録に失敗しました。',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };


  useEffect(() => {
    setFocus("serialNumber");
  }, [setFocus]);

  return (
    <Container p={6} bg={bg} rounded="md" shadow="md">
      <Heading as="h2" fontSize="2xl">加工指示書登録</Heading>
      <Box as="form" mt={6} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Box>
            <Text>NO.</Text>
            <Input mt={1} {...register("serialNumber", { required: true })} />
            {errors.serialNumber && <Box color="red.400">NO.を入力してください。</Box>}
          </Box>
          <Box>
            <Text>加工指示書NO.</Text>
            <Input mt={1} {...register("processNumber")} />
            {errors.processNumber && <Box color="red.400">加工指示書を入力してください。</Box>}
          </Box>
          <Box>
            <Text>ユーザー名</Text>
            <Input mt={1} {...register("customer", { required: true })} />
            {errors.customer && <Box color="red.400">ユーザー名を入力してください。</Box>}
          </Box>
          <Box>
            <Text>商品名</Text>
            <Input mt={1} {...register("productName", { required: true })} />
            {errors.productName && <Box color="red.400">商品名を入力してください。</Box>}
          </Box>
          <Box>
            <Text>サイズ明細</Text>
            <Input mt={1} {...register("sizeDetails")} />
            {errors.sizeDetails && <Box color="red.400">商品名を入力してください。</Box>}
          </Box>
          <Box>
            <Text>合計</Text>
            <NumberInput mt={1}>
              <NumberInputField {...register("quantity", { required: true })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors.quantity && <Box color="red.400">数量を入力してください。</Box>}
          </Box>
          <Box>
            <Text>備考</Text>
            <Textarea mt={1} {...register("comment")} />
          </Box>
          <Button type="submit" colorScheme="yellow" color="white">登録</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddTask;