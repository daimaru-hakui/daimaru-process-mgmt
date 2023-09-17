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
  useColorModeValue,
} from '@chakra-ui/react';
import { HiMenuAlt2 } from "react-icons/hi";
import { sidebarLinks } from '../utils/Links';
import { Link, useLocation } from 'react-router-dom';
import { useColors } from '../hooks/useColors';

const DrowerSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const { bgPrimaryColor } = useColors();
  const listColor = useColorModeValue('gray.100', 'gray.700');

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
        <DrawerContent bg={bgPrimaryColor}>
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
                  _hover={{ bg: listColor }}
                  bg={pathname === path ? listColor : "transparent"}
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