import { Box } from "@chakra-ui/react";
import daimaruImg from "../assets/daimaru.svg";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to="/dashboard">
      <Box width="140px">
        <img src={daimaruImg} alt="daimaruImg" />
      </Box>
    </Link>
  );
};

export default Logo;
