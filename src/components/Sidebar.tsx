import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { sidebarLinks } from "../utils/Links";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../store";
import Logo from "./Logo";

const Sidebar = () => {
  const { pathname } = useLocation();
  const isSidebar = useStore((state) => state.isSidebar);
  const bg = useColorModeValue('white', 'gray.700');
  const listColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box as="aside"
      w={300}
      px={2}
      minH="100vh"
      transition="0.5s"
      shadow="md"
      bg={bg}
      display={{ base: "none", md: "block" }}
      transform={isSidebar ? "translateX(0)" : " translateX(-300px)"}
    >
      <Box position="sticky" top={0} left="0">
        <Flex pl={2} h={12} align="center"><Logo/></Flex>
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
      </Box>
    </Box >
  );
};

export default Sidebar;