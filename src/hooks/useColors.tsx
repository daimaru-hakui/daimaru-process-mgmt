import { useColorModeValue } from '@chakra-ui/react';

export const useColors = () => {

  const bgPrimaryColor = useColorModeValue("white", "gray.700");
  return (
    { bgPrimaryColor }
  );
};
