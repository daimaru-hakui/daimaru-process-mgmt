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
  Box,
  Stack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdSearch } from "react-icons/md";
import AllTasksSearchInput from './AllTasksSearchInput';
import { useColors } from '../../hooks/useColors';

type Props = {
  onReset: () => void;
};

const AllTasksSearchDrawer: FC<Props> = ({ onReset }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgPrimaryColor } = useColors();

  return (
    <>
      <Box
        p={4}
        position="fixed"
        bottom={2}
        right={2}
        rounded="full"
        bg='teal'
        cursor="pointer"
        onClick={onOpen}
        display={{ base: "block", lg: "none" }}
      >
        <MdSearch fontSize={28} color="white" />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size="sm"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgPrimaryColor}>
          <DrawerCloseButton />
          <DrawerHeader>Search</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6}>
              <AllTasksSearchInput
                onReset={onReset}
              />
            </Stack>
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

export default AllTasksSearchDrawer;