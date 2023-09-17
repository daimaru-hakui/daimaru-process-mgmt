import { Box, Container, Flex } from '@chakra-ui/react';
import { FC } from "react";
import { Link } from 'react-router-dom';
import { useColors } from '../../hooks/useColors';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type Props = {
  prevId: string | null;
  nextId: string | null;
  isCompleted: boolean;
};

const TaskNextPrev: FC<Props> = ({ prevId, nextId, isCompleted }) => {
  const URL = isCompleted ? "/dashboard/task-histories" : "/dashboard/all-tasks";
  const { bgPrimaryColor, textPrimaryColor } = useColors();
  return (
    <Container p={0} maxW={1000}>
      <Flex
        p={3}
        w="full"
        h={12}
        gap={6}
        justify="space-between"
        align="center"
        color={{ base: "white", md: textPrimaryColor }}
        bg={{ base: "#051e34", md: bgPrimaryColor }}
        fontSize="lg"
        boxShadow="md"
        rounded={{ base: "initial", md: "md" }}
        position={{ base: "fixed", md: "initial" }}
        bottom={0}
        left={0}
        zIndex={10}
      >
        <Flex flex={1} justify="left" align="center">
          {prevId && (
            <Link to={`${URL}/${prevId}`}>
              <Flex gap={3} align="center">
                <MdArrowBackIos />
                <Box display={{ base: "none", md: "block" }}>{prevId}</Box>
              </Flex>
            </Link>
          )}
        </Flex>
        <Flex flex={1} justify="center">
          <Link to={`${URL}`}>一覧</Link>
        </Flex>
        <Flex flex={1} justify="right" align="center">
          {nextId && (
            <Link to={`${URL}/${nextId}`}>
              <Flex gap={3} align="center">
                <Box display={{ base: "none", md: "block" }}>{nextId}</Box>
                <MdArrowForwardIos />
              </Flex>
            </Link>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default TaskNextPrev;