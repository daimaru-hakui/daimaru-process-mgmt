import { Box, Button, Container, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
const Measure = () => {
  const toast = useToast();
  const [isActive, setIsActive] = useState(true);
  const [serialNumber, setSerialNumber] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const name = pathname.split('/').pop();


  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [isActive]);

  const handleChangeActive = () => {
    setIsActive((state) => !state);
  };

  const handleChangeSerialNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSerialNumber(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!name) return;
    if (e.code === "Enter") {
      isActive && updateTaskStart(name);
      !isActive && updateTaskEnd(name);
    }
  };

  const updateTaskStart = async (name: string) => {
    try {
      const docRef = doc(db, "tasks", serialNumber);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        toast({
          title: 'その加工指示書は存在しません。',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        throw new Error("シリアルナンバーが見つかりません。");
      }
      const prev = docSnap.data();
      if (!prev) return;
      await updateDoc(docRef, {
        [name]: {
          start: new Date(),
          end: prev[name].end || ""
        }
      });
      toast({
        title: '登録が完了しました。',
        description: `開始時刻:${new Date()}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: '登録が失敗しました。',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const updateTaskEnd = async (name: string) => {
    try {
      const docRef = doc(db, "tasks", serialNumber);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        toast({
          title: 'その加工指示書は存在しません。',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        throw new Error("シリアルナンバーが見つかりません。");
      }
      const prev = docSnap.data();
      if (!prev) return;
      await updateDoc(docRef, {
        [name]: {
          start: prev[name].end || "",
          end: new Date(),
        }
      });
      toast({
        title: '登録が完了しました。',
        description: `終了時刻:${new Date()}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: '登録が失敗しました。',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <Container
      p={6}
      w="full"
      maxW={1200}
      bg="white"
      rounded="md"
      shadow="md"
    >
      <Heading as='h2'></Heading>
      <Flex gap={6}>
        <Button
          w="full"
          h={24}
          fontSize={24}
          colorScheme={isActive ? "blue" : "gray"}
          onClick={handleChangeActive}>
          Start
        </Button>
        <Button
          w="full"
          h={24}
          fontSize={24}
          colorScheme={isActive ? "gray" : "red"}
          onClick={handleChangeActive}
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
export default
  Measure;