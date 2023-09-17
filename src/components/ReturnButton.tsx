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
        p={3}
        w="full"
        justify="center"
        align="center"
        gap={3}
        color="white"
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
