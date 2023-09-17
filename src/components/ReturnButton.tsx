import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";
import { useColors } from "../hooks/useColors";

const ReturnButton = () => {
  const { bgPrimaryColor } = useColors();
  return (
    <Link to="/dashboard/select">
      <Flex
        mt={6}
        mx="auto"
        p={3}
        w="full"
        maxW={1200}
        justify="center"
        align="center"
        gap={3}
        bg={bgPrimaryColor}
        fontSize={32}
        rounded="md"
        shadow="md"
        _hover={{ opacity: 0.9 }}
        transition="0.3s"
      >
        <IoMdReturnLeft />
        <Box>戻る</Box>
      </Flex>
    </Link>
  );
};

export default ReturnButton;
