import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import { HiMenuAlt2 } from "react-icons/hi";
import { sidebarLinks } from '../utils/Links';
import { Link, useLocation } from 'react-router-dom';

const DrowerSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  return (
    <>
      <HiMenuAlt2
        fontSize={24}
        cursor="pointer"
        onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>menu</DrawerHeader>

          <DrawerBody>
            {sidebarLinks.map(({ path, name, icon }) => (
              <Link key={path} to={path} onClick={onClose}>
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
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              閉じる
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrowerSidebar;