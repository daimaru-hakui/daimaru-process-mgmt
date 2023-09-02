import { Box, Flex } from "@chakra-ui/react";
import { sidebarLinks } from "../utils/Links";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../store";

const Sidebar = () => {
  const { pathname } = useLocation();
  const isSidebar = useStore((state) => state.isSidebar);

  return (
    <Box as="aside"
      w={300}
      px={2}
      minH="100vh"
      transition="0.5s"
      shadow="md"
      bg="white"
      display={{ base: "none", md: "block" }}
      transform={isSidebar ? "translateX(0)" : " translateX(-300px)"}
    >
      <Box position="sticky" top={0} left="0">
        <Flex pl={2} h={12} align="center">大丸白衣</Flex>
        {sidebarLinks.map(({ path, name, icon }) => (
          <Link key={path} to={path}>
            <Flex
              p={1}
              py={1}
              my={1}
              justify="start"
              align="center"
              rounded="md"
              _hover={{ bg: "gray.100" }}
              bg={pathname === path ? "gray.100" : "transparent"}
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