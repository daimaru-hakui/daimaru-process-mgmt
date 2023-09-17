import { Outlet } from 'react-router-dom';
import '../index.css';
import { Box } from '@chakra-ui/react';
import { useColors } from '../hooks/useColors';
const HomeLayout = () => {
  const { bgSecondaryColor } = useColors();
  return (
    <Box w="full" minH="100vh" bg={bgSecondaryColor}>
      <Outlet />
    </Box>
  );
};

export default HomeLayout;