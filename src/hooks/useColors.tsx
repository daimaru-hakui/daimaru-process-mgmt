import { useColorModeValue } from '@chakra-ui/react';

export const useColors = () => {

  const bgPrimaryColor = useColorModeValue("white", "gray.900");
  const bgSecondaryColor = useColorModeValue("gray.50", "gray.800");
  const btnTextPrimaryColor = useColorModeValue("white", "black");
  const textPrimaryColor = useColorModeValue("black", "white");
  return (
    { bgPrimaryColor, bgSecondaryColor, btnTextPrimaryColor, textPrimaryColor }
  );
};
