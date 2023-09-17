import { Grid, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useColors } from "../hooks/useColors";

type Props = {
  title: string;
  path: string;
};

const MeasureCard: FC<Props> = ({ title, path }) => {
  const { bgPrimaryColor } = useColors();
  return (
    <Link to={path}>
      <Grid
        justifyContent="center"
        p={6}
        bg={bgPrimaryColor}
        rounded="md"
        shadow="md"
        transition="0.3s"
        _hover={{ bg: "#ecc94b" }}
      >
        <Heading size="md">{title}</Heading>
      </Grid>
    </Link>
  );
};

export default MeasureCard;
