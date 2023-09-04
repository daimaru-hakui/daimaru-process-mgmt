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
  Select,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "../../firebase";
import { Staff } from "../../types";

type Inputs = {
  id?: string;
  serialNumber: string;
  staffId: string;
  processNumber: string;
  productName: string;
  productNumber: string;
  customer: string;
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
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
        showToast("この番号はすでに登録済みです", "error");
        throw new Error("この番号はすでに登録済みです");
      }
      await setDoc(docRef, {
        ...data,
        serialNumber: data.serialNumber.trim(),
        quantity: +data.quantity,
        // reception: { start: "", end: "", startCreateUser: "", endCreateUser: "" },
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
        createdAt: serverTimestamp(),
      });
      showToast("登録しました。", "success");
      reset();
    } catch (error) {
      showToast("登録に失敗しました。", "error");
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
        staffId: data.staffId,
        productNumber: data.productNumber.trim(),
        customer: data.customer,
        productName: data.productName,
        sizeDetails: data.sizeDetails,
        quantity: +data.quantity,
        comment: data.comment,
        updateAt: serverTimestamp(),
      });
      showToast("更新しました。", "success");
      reset();
    } catch (error) {
      showToast("更新に失敗しました。", "error");
      console.log(error);
    }
  };

  const showToast = (
    title: string,
    status: "success" | "error",
    duration: number = 2000
  ) => {
    toast({
      title,
      status,
      duration,
      isClosable: true,
      position: "top-right",
    });
  };

  useEffect(() => {
    const getStaffs = async () => {
      const staffsCollection = collection(db, "staffs");
      const snapShot = await getDocs(staffsCollection);
      setStaffs(
        snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Staff))
      );
    };
    getStaffs();
  }, []);

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
          // isDisabled={pageType === "EDIT" ? true : false}
          />
          {errors.serialNumber && (
            <Box color="red.400">NO.を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>加工指示書NO.</Text>
          <Input mt={1} {...register("processNumber")} />
          {errors.processNumber && (
            <Box color="red.400">加工指示書を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>担当者</Text>
          <Select
            placeholder="担当者"
            defaultValue={getValues("staffId")}
            {...register("staffId")}
          >
            {staffs.map((staff) => (
              <option
                selected={getValues("staffId") === staff.id && true}
                key={staff.id}
                value={staff.id}
              >
                {staff.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>ユーザー名</Text>
          <Input mt={1} {...register("customer", { required: true })} />
          {errors.customer && (
            <Box color="red.400">ユーザー名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>品番</Text>
          <Input mt={1} {...register("productNumber")} />
          {errors.productName && (
            <Box color="red.400">商品名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>商品名</Text>
          <Input mt={1} {...register("productName", { required: true })} />
          {errors.productName && (
            <Box color="red.400">商品名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>サイズ明細</Text>
          <Input mt={1} {...register("sizeDetails")} />
          {errors.sizeDetails && (
            <Box color="red.400">商品名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>合計</Text>
          <NumberInput mt={1}>
            <NumberInputField
              {...register("quantity", { required: true, min: 1 })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.quantity && (
            <Box color="red.400">数量を入力してください。</Box>
          )}
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
