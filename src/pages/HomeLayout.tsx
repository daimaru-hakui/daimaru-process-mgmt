import { Outlet } from 'react-router-dom';
import '../index.css';
import { Box } from '@chakra-ui/react';
const HomeLayout = () => {
  return (
    <Box w="full" minH="100vh" bg="gray.50">
      <Outlet />
    </Box>
  );
};

export default HomeLayout;