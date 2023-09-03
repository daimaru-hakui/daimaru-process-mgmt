import { Button, useColorMode } from "@chakra-ui/react";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  );
};

export default ColorModeButton;