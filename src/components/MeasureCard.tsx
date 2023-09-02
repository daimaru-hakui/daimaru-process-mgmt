import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { FC } from "react";
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  path: string;
};

const MeasureCard: FC<Props> = ({ title, path }) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>{title}</Heading>

          <Text py='2'>
            説明文
          </Text>
        </CardBody>

        <CardFooter>
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