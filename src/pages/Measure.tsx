import { Box, Button, Container, Flex, Heading, Input, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { useStore } from "../../store";

const Measure = () => {
  const session = useStore((state) => state.session);
  const currentUser = session?.uid;
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const [isActive, setIsActive] = useState(true);
  const [serialNumber, setSerialNumber] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const name = pathname.split('/').pop();
  let title = "";

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [isActive]);

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
    case "warehouse":
      title = "倉庫入荷";
  }

  const handleChangeActive = (bool: boolean) => {
    setIsActive(bool);
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const handleChangeSerialNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSerialNumber(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!name) return;
    if (e.code === "Enter" || e.code === "Space") {
      isActive && updateTaskStart(name);
      !isActive && updateTaskEnd(name);
    }
  };

  const updateTaskStart = async (name: string) => {
    try {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser);
      const docRef = doc(db, "tasks", serialNumber.trim());
      console.log(userRef);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        errorToastNotExists();
        throw new Error("シリアルナンバーが見つかりません。");
      }
      const prev = docSnap.data();
      if (!prev) return;
      if (prev[name].start) {
        const result = confirm("上書きしますか");
        if (!result) return;
      }
      await updateDoc(docRef, {
        [name]: {
          start: new Date(),
          end: prev[name].end || "",
          startCreateUser: userRef,
          endCreateUser: prev[name].endCreateUser,
        }
      });
      successToast();
    } catch (error) {
      errorToast();
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const updateTaskEnd = async (name: string) => {
    try {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser);
      const docRef = doc(db, "tasks", serialNumber.trim());
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        errorToastNotExists();
        throw new Error("シリアルナンバーが見つかりません。");
      }
      const prev = docSnap.data();
      if (!prev) return;
      if (prev[name].end) {
        const result = confirm("上書きしますか");
        if (!result) return;
      }
      await updateDoc(docRef, {
        [name]: {
          start: prev[name].start || "",
          end: new Date(),
          startCreateUser: prev[name].startCreateUser,
          endCreateUser: userRef
        }
      });
      successToast();
    } catch (error) {
      errorToast();
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const errorToastNotExists = () => {
    toast({
      title: 'その加工指示書は存在しません。',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const errorToast = () => {
    toast({
      title: '登録が失敗しました。',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const successToast = () => {
    toast({
      title: `No.${serialNumber} 登録が完了しました。`,
      description: `終了時刻:${new Date()}`,
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Container
      p={6}
      w="full"
      maxW={1200}
      bg={bg}
      rounded="md"
      shadow="md"
    >
      <Heading as='h2' fontSize={24}>{title}</Heading>
      <Flex gap={6} mt={6}>
        <Button
          w="full"
          h={24}
          fontSize={24}
          colorScheme={isActive ? "blue" : "gray"}
          onClick={() => handleChangeActive(true)}>
          Start
        </Button>
        <Button
          w="full"
          h={24}
          fontSize={24}
          colorScheme={isActive ? "gray" : "red"}
          onClick={() => handleChangeActive(false)}
        >End
        </Button>
      </Flex>
      <Box mt={12}>
        {isActive && (
          <>
            <Text >Start:</Text>
            <Input
              mt={1}
              ref={inputRef}
              onChange={handleChangeSerialNumber}
              onKeyDown={handleKeyDown}
            />
          </>
        )}
        {!isActive && (
          <>
            <Text >End:</Text>
            <Input
              mt={1}
              ref={inputRef}
              onChange={handleChangeSerialNumber}
              onKeyDown={handleKeyDown}
            />
          </>
        )}
      </Box>
    </Container>
  );
};
export default Measure;