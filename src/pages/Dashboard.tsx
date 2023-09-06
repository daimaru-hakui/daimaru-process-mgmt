import { Container } from "@chakra-ui/react";
import StatComponent from "../components/StatComponent";


const Dashboard = () => {

  return (
    <Container p={6} rounded="md">
      <StatComponent />
    </Container>
  );
};

export default Dashboard;
