import { Box, Flex, IconButton, MenuDivider } from "@chakra-ui/react";
// import { headerLinks } from "../utils/Links";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuDivider,
} from '@chakra-ui/react';
import { IoMenuSharp } from "react-icons/io5";
import { auth } from "../../firebase";
import DrowerSidebar from "./DrowerSidebar";
import { HiMenuAlt2 } from "react-icons/hi";
import { useStore } from '../../store';


const Navbar = () => {
  const session = useStore((state) => state.session);
  const navigate = useNavigate();
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const isSidebar = useStore((state) => state.isSidebar);
  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <Flex as="header" position="sticky" top={0} zIndex={10} px={6} h={12} w="full" justify="space-between" align="center" bg="white" shadow="sm">
      <Box display={{ base: "block", md: "none" }}>
        <DrowerSidebar />
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <HiMenuAlt2 fontSize={24} cursor="pointer" onClick={() => toggleSidebar(!isSidebar)} />
      </Box>
      <Flex as="nav" gap={3} align="center">

        <Menu>

          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<IoMenuSharp fontSize={20} color="white" />}
            colorScheme="yellow"
          />
          <MenuList>
            <Box p={1} px={3}>{session?.email}</Box>
            {/* <MenuItem>ダッシュボード</MenuItem> */}
            <MenuDivider />
            <MenuItem onClick={logout}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;