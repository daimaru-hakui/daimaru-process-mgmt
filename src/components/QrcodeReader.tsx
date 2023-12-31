import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { FC, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { BsQrCodeScan } from "react-icons/bs";

type Inputs = {
  serialNumber: string;
};

type Props = {
  setValue: UseFormSetValue<Inputs>;
};

const QrcodeReader: FC<Props> = ({ setValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const controlsRef = useRef<IScannerControls | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reader, setReader] = useState<IScannerControls>();

  const startCodeReader = async () => {
    if (!videoRef.current) return;
    const codeReader = new BrowserMultiFormatReader();
    // const codeReader = new BrowserQRCodeReader();

    const controls = await codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => {
        if (error) {
          console.log("log");
          return;
        }
        if (result) {
          console.log(result.getText());
          setValue("serialNumber", result.getText());
        }
        controlsRef.current?.stop();
        controlsRef.current = controls;
        setReader(controls);
        onClose();
      }
    );
    setReader(controls);
  };

  const resetCodeReader = () => {
    if (!reader) return;
    controlsRef.current = null;
    reader.stop();
  };

  return (
    <>
      <Flex
        mt={12}
        mb={6}
        justify="center"
        display={{ base: "flex", lg: "none" }}
      >
        <BsQrCodeScan fontSize={96} cursor="pointer" onClick={onOpen} />
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetCodeReader();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SCAN</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Box
              as="video"
              id="video"
              width="100%"
              height="50vh"
              bg="black"
              ref={videoRef}
            ></Box>
            <Flex mt={3} gap={3}>
              <Button w="full" onClick={resetCodeReader}>
                Reset
              </Button>
              <Button w="full" colorScheme="linkedin" onClick={startCodeReader}>
                Start
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                resetCodeReader();
                onClose();
              }}
            >
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QrcodeReader;
