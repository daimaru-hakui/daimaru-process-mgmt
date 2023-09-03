import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, useColorModeValue } from '@chakra-ui/react';
import { FC } from "react";
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  path: string;
};

const MeasureCard: FC<Props> = ({ title, path }) => {
  const bg = useColorModeValue('white', 'gray.700');
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      h={150}
      bg={bg}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '150px' }}
        h={150}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody >
          <Heading size='md'>{title}</Heading>
        </CardBody>

        <CardFooter w="full">
          <Link to={path}>
            <Button w="full" variant='solid' colorScheme='yellow' color="white">
              計測へ進む
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default MeasureCard;