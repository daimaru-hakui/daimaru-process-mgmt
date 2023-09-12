import { Grid, Heading, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  path: string;
};

const MeasureCard: FC<Props> = ({ title, path }) => {
  const bg = useColorModeValue("white", "gray.700");
  return (
    <Link to={path}>
      <Grid
        justifyContent="center"
        p={6}
        bg={bg}
        rounded="md"
        shadow="md"
        transition="0.3s"
        _hover={{ bg: "#ecc94b"}}
      >
        <Heading size="md">{title}</Heading>
      </Grid>
    </Link>
  );
};

export default MeasureCard;
