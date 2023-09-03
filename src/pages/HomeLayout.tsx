import { Outlet } from 'react-router-dom';
import '../index.css';
import { Box, useColorModeValue } from '@chakra-ui/react';
const HomeLayout = () => {
  const bg = useColorModeValue('gray.50', 'gray.800');
  return (
    <Box w="full" minH="100vh" bg={bg}>
      <Outlet />
    </Box>
  );
};

export default HomeLayout;