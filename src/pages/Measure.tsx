import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { useStore } from "../../store";
import QrcodeReader from "../components/QrcodeReader";
import { useForm, SubmitHandler } from "react-hook-form";
import ReturnButton from "../components/ReturnButton";
import { useColors } from "../hooks/useColors";

type Inputs = {
  serialNumber: string;
};

const Measure = () => {
  const session = useStore((state) => state.session);
  const currentUser = session?.uid;
  const toast = useToast();
  const { bgPrimaryColor } = useColors();
  const { pathname } = useLocation();
  const name = pathname.split("/").pop();
  const select = pathname.split("/").slice(-2).shift();
  let title = "";

  const { register, handleSubmit, reset, setFocus, setValue } =
    useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!name) return;
    select === "start" && updateTaskStart(name, data.serialNumber);
    select === "end" && updateTaskEnd(name, data.serialNumber);
  };

  switch (name) {
    case "reception":
      title = "受付";
      break;
    case "pattern":
      title = "パターン準備";
      break;
    case "cutting":
      title = "裁断";
      break;
    case "materials":
      title = "資材準備";
      break;
    case "sewing":
      title = "縫製加工";
      break;
    case "finishing":
      title = "仕上げ";
      break;
    case "warehouse":
      title = "倉庫入荷";
  }

  const updateTaskStart = async (name: string, serialNumber: string) => {
    try {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser);
      const docRef = doc(db, "tasks", serialNumber.trim());
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        showToast("その加工指示書は存在しません。", "error");
        throw new Error("シリアルナンバーが見つかりません。");
      }
      const prev = docSnap.data();
      if (prev[name].startTime) {
        const result = confirm("上書きしますか");
        if (!result) return;
      }
      await updateDoc(docRef, {
        [name]: {
          startTime: new Date(),
          endTime: prev[name].endTime || "",
          startCreateUser: userRef,
          endCreateUser: prev[name].endCreateUser,
          elapsedTime: 0,
        },
      });
      showToast(`No.${serialNumber} 登録が完了しました。`, "success", 4000);
    } catch (error) {
      showToast("登録が失敗しました。", "error");
    } finally {
      reset();
    }
  };

  const updateTaskEnd = async (name: string, serialNumber: string) => {
    try {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser);
      const docRef = doc(db, "tasks", serialNumber.trim());
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        showToast("その加工指示書は存在しません。", "error");
        throw new Error("シリアルナンバーが見つかりません。");
      }
      const prev = docSnap.data();
      if (prev[name].endTime) {
        const result = confirm("上書きしますか");
        if (!result) return;
      }
      const elapsedTime = getElapsedTime(prev[name].startTime.toDate());

      await updateDoc(docRef, {
        [name]: {
          startTime: prev[name].startTime || "",
          endTime: new Date(),
          startCreateUser: prev[name].startCreateUser,
          endCreateUser: userRef,
          elapsedTime: elapsedTime || 0,
        },
      });
      showToast(`No.${serialNumber} 登録が完了しました。`, "success", 4000);
    } catch (error) {
      showToast("登録が失敗しました。", "error");
    } finally {
      reset();
    }
  };

  const getElapsedTime = (time: number) => {
    return new Date().getTime() - time;
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
    setFocus("serialNumber");
  }, [setFocus]);

  return (
    <>
      <Container p={6} w="full" maxW={1200} bg={bgPrimaryColor} rounded="md" shadow="md">
        <Heading
          as="h2"
          fontSize={24}
          color={select === "start" ? "blue" : "red"}
        >
          {title}
          <Box as="span" ml={1}>
            {select === "start" ? "（開始）" : "（完了）"}
          </Box>
        </Heading>
        <Box mt={6}>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Flex mt={1} gap={3} align="center">
              <Input {...register("serialNumber")} />
              <Button type="submit">送信</Button>
            </Flex>
          </Box>
        </Box>
        <QrcodeReader setValue={setValue} />
      </Container>
      <ReturnButton />
    </>
  );
};
export default Measure;
