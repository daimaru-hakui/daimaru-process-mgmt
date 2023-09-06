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
  Select,
  Flex,
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
import { db } from "../../../firebase";
import { Staff } from "../../../types";
import { useUtils } from "../../hooks/useUtils";

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
  sp: number;
  cp: number;
  salesDay: string;
  comment: string;
};

type Props = {
  defaultValues: Inputs;
  pageType: "NEW" | "EDIT";
  onClose?: () => void;
};

const TaskForm: FC<Props> = ({ defaultValues, pageType, onClose }) => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const { showToast } = useUtils();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
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
        sp: +data.sp,
        cp: +data.cp,
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
        sp: +data.sp,
        cp: +data.cp,
        salesDay: data.salesDay,
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
          <Text>
            NO.
            <Box as="span" color="red">
              *
            </Box>
          </Text>
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
            mt={1}
            placeholder="担当者"
            {...register("staffId")}
            defaultValue={defaultValues.staffId}

          >
            {staffs?.map((staff) => (
              <option
                key={staff.id}
                value={staff.id}
              >
                {staff.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>
            ユーザー名
            <Box as="span" color="red">
              *
            </Box>
          </Text>
          <Input mt={1} {...register("customer", { required: true })} />
          {errors.customer && (
            <Box color="red.400">ユーザー名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>品番</Text>
          <Input mt={1} {...register("productNumber")} />
        </Box>
        <Box>
          <Text>
            商品名
            <Box as="span" color="red">
              *
            </Box>
          </Text>
          <Input mt={1} {...register("productName", { required: true })} />
          {errors.productName && (
            <Box color="red.400">商品名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>サイズ明細</Text>
          <Textarea mt={1}  {...register("sizeDetails")} />
          {errors.sizeDetails && (
            <Box color="red.400">商品名を入力してください。</Box>
          )}
        </Box>
        <Box>
          <Text>
            合計
            <Box as="span" color="red">
              *
            </Box>
          </Text>
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
        <Flex gap={6}>
          <Box>
            <Text>SP価格</Text>
            <NumberInput mt={1}>
              <NumberInputField {...register("sp")} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Text>CP価格</Text>
            <NumberInput mt={1}>
              <NumberInputField {...register("cp")} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>
        <Box>
          <Text>希望納期</Text>
          <Input type="date" mt={1} {...register("salesDay")} />
        </Box>
        <Box>
          <Text>備考</Text>
          <Textarea mt={1} {...register("comment")} />
        </Box>
        <Button type="submit" colorScheme="yellow" color="white">
          {pageType === "NEW" ? "登録" : "更新"}
        </Button>
      </Stack >
    </Box >
  );
};

export default TaskForm;
