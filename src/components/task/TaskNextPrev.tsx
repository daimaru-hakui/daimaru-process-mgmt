import { Box, Container, Flex } from '@chakra-ui/react';
import { FC, useRef } from "react";
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
  const nextRef = useRef<HTMLAnchorElement>(null);
  const prevRef = useRef<HTMLAnchorElement>(null);

  const clickHandler = (ref: React.RefObject<HTMLAnchorElement>) => {
    if (!ref.current) return;
    ref.current.style.backgroundColor = "gray";
    ref.current.style.transition = "0.5s";
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.style.backgroundColor = "";
    }, 100);
  };


  return (
    <Container p={0} maxW={1000}>
      <Flex
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
        <Flex px={{ base: 6, md: 3 }} flex={1} justify="left" align="center">
          {prevId && (
            <Link
              to={`${URL}/${prevId}`}
              ref={nextRef}
              style={{ borderRadius: "5px" }}
              onClick={() => clickHandler(nextRef)}
            >
              <Flex gap={3} align="center" py={1} px={3}>
                <MdArrowBackIos />
                <Box display={{ base: "none", md: "block" }}>{prevId}</Box>
              </Flex>
            </Link>
          )}
        </Flex>
        <Flex flex={1} justify="center">
          <Link
            to={`${URL}`}
          >
            <Box p={3} px={6}>一覧</Box>
          </Link>
        </Flex>
        <Flex px={{ base: 6, md: 3 }} flex={1} justify="right" align="center">
          {nextId && (
            <Link
              to={`${URL}/${nextId}`}
              ref={prevRef}
              style={{ borderRadius: "5px" }}
              onClick={() => clickHandler(prevRef)}
            >
              <Flex gap={3} align="center" py={1} px={3}>
                <Box display={{ base: "none", md: "block" }}>{nextId}</Box>
                <MdArrowForwardIos />
              </Flex>
            </Link>
          )}
        </Flex>
      </Flex>
    </Container >
  );
};

export default TaskNextPrev;