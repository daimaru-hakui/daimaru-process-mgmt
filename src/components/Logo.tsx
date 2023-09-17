import { Box, useColorMode } from "@chakra-ui/react";
import daimaruImg from "../assets/daimaru.svg";
import daimaruDarkImg from "../assets/daimaruDark.svg";
import { Link } from "react-router-dom";
const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Link to="/dashboard">
      <Box width="140px">
        <img src={colorMode === "light" ? daimaruImg : daimaruDarkImg} />
      </Box>
    </Link>
  );
};

export default Logo;
