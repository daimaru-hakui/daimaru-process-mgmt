import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { sidebarLinks } from "../utils/Links";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../store";
import Logo from "./Logo";
import { useColors } from "../hooks/useColors";
import { RiAdminLine } from "react-icons/ri";

const Sidebar = () => {
  const { pathname } = useLocation();
  const isSidebar = useStore((state) => state.isSidebar);
  const session = useStore((state) => state.session);
  const email = session?.email;
  const { bgPrimaryColor } = useColors();
  const listColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box as="aside"
      w={300}
      px={2}
      minH="100vh"
      transition="0.5s"
      shadow="md"
      bg={bgPrimaryColor}
      display={{ base: "none", md: "block" }}
      transform={isSidebar ? "translateX(0)" : " translateX(-300px)"}
    >
      <Box position="sticky" top={0} left="0">
        <Flex pl={2} h={12} align="center"><Logo /></Flex>
        {sidebarLinks.map(({ path, name, icon }) => (
          <Link key={path} to={path}>
            <Flex
              p={1}
              py={1}
              my={1}
              justify="start"
              align="center"
              rounded="md"
              _hover={{ bg: listColor }}
              bg={pathname === path ? listColor : "transparent"}
            >
              <Box>{icon}</Box>
              <Box ml={6} >{name}</Box>
            </Flex>
          </Link>
        ))}
        {email === "mukai@daimaru-hakui.co.jp" && (
          <Link to={'/dashboard/admin'}>
            <Flex
              p={1}
              py={1}
              my={1}
              justify="start"
              align="center"
              rounded="md"
              _hover={{ bg: listColor }}
              bg={pathname === '/dashboard/admin' ? listColor : "transparent"}
            >
              <Box><RiAdminLine /></Box>
              <Box ml={6} >権限管理</Box>
            </Flex>
          </Link>
        )}
      </Box>
    </Box >
  );
};

export default Sidebar;