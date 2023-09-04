import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  label: string;
};

const GanttLabel: FC<Props> = ({ label }) => {
  return (
    <Flex
      w="100%"
      h={10}
      position="relative"
      align="center"
    >
      <Text ml={3}>{label}</Text>
    </Flex>
  );
};

export default GanttLabel;