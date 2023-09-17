import { Button, useColorMode } from "@chakra-ui/react";
import { BsMoonFill, BsSun } from "react-icons/bs";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button px={3} onClick={toggleColorMode} bg="transparent" fontSize={16}>
        {colorMode === 'light' ? <BsMoonFill /> : <BsSun />}
      </Button>
    </header>
  );
};

export default ColorModeButton;