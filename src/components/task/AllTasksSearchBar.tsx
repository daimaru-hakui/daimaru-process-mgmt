import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import AllTasksSearchInput from './AllTasksSearchInput';

type Props = {
  onReset: () => void;
};

const AllTasksSearchBar: FC<Props> = ({
  onReset
}) => {
  return (
    <Flex
      w="full"
      mt={6}
      mx="auto"
      justify="center"
      gap={3}
      display={{ base: "none", lg: "flex" }}
    >
      <AllTasksSearchInput
        onReset={onReset}
      />

    </Flex >
  );
};

export default AllTasksSearchBar;