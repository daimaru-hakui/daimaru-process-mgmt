import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const StartOrEnd = () => {
  return (
    <Flex w="full" gap={6} mt={6}>
      <Link style={{ width: "100%" }} to="/dashboard/select/start">
        <Button w="full" h={36} fontSize={36} colorScheme="blue">
          開始
        </Button>
      </Link>
      <Link style={{ width: "100%" }} to="/dashboard/select/end">
        <Button w="full" h={36} fontSize={36} colorScheme="red">
          完了
        </Button>
      </Link>
    </Flex>
  );
};

export default StartOrEnd;
