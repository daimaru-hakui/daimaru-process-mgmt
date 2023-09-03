import { Button, Grid, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import { FC } from "react";
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  path: string;
};

const MeasureCard: FC<Props> = ({ title, path }) => {
  const bg = useColorModeValue('white', 'gray.700');
  return (
    <Grid
      p={6}
      bg={bg}
      rounded="md"
      shadow="md"
    >
      <Stack spacing={6}>
        <Heading size='md'>{title}</Heading>
        <Link to={path}>
          <Button w="full" variant='solid' colorScheme='yellow' color="white">
            計測へ進む
          </Button>
        </Link>
      </Stack>
    </Grid>
  );
};

export default MeasureCard;