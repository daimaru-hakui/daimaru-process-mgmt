import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "../../firebase";

type Inputs = {
  id?: string;
  serialNumber: string,
  processNumber: string,
  customer: string;
  productName: string;
  sizeDetails: string;
  quantity: number;
  comment: string;
};

type Props = {
  defaultValues: Inputs;
  pageType: "NEW" | "EDIT";
  onClose?: () => void;
};

const TaskForm: FC<Props> = ({ defaultValues, pageType, onClose }) => {
  const toast = useToast();
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm<Inputs>({
    defaultValues
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    switch (pageType) {
      case "NEW":
        addTask(data);
        break;
      case "EDIT":
        updateTask(data);
        onClose && onClose();
        break;
    }
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
        reception: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
        pattern: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
        cutting: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
        materials: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
        sewing: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
        warehouse: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
        createdAt: serverTimestamp()
      });
      successNewToast();
      reset();
    } catch (error) {
      errorToast();
      console.log(error);
    }
  };

  const updateTask = async (data: Inputs) => {
    if (!data.id) return;
    const docRef = doc(db, "tasks", data?.id);
    try {
      await updateDoc(docRef, {
        serialNumber: data.serialNumber.trim(),
        processNumber: data.processNumber.trim(),
        customer: data.customer,
        productName: data.productName,
        sizeDetails: data.sizeDetails,
        quantity: +data.quantity,
        comment: data.comment,
        updateAt: serverTimestamp()
      });
      successUpdateToast();
      reset();
    } catch (error) {
      errorToast();
      console.log(error);
    }
  };

  const successNewToast = () => {
    toast({
      title: '登録しました。',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const successUpdateToast = () => {
    toast({
      title: '更新しました。',
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
    <Box as="form" mt={6} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Box>
          <Text>NO.</Text>
          <Input
            mt={1}
            {...register("serialNumber", { required: true })}
            isDisabled={pageType === "EDIT" ? true : false}
          />
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
            <NumberInputField {...register("quantity", { required: true, min: 1 })} />
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
        <Button type="submit" colorScheme="yellow" color="white">
          {pageType === "NEW" ? "登録" : "更新"}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;