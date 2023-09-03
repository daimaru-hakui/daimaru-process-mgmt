import { Container, Grid } from "@chakra-ui/react";
import MeasureCard from "../components/MeasureCard";

const MeasureList = () => {
  const path = "/dashboard/measure-list";

  return (
    <Container
      w="full"
      maxW={1800}
    >
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', "xl": 'repeat(4, 1fr)', "2xl": 'repeat(5, 1fr)' }} gap={6}>
        <MeasureCard title="受付" path={`${path}/reception`} />
        <MeasureCard title="パターン準備" path={`${path}/pattern`} />
        <MeasureCard title="裁断" path={`${path}/cutting`} />
        <MeasureCard title="資材準備" path={`${path}/materials`} />
        <MeasureCard title="縫製加工" path={`${path}/sewing`} />
        <MeasureCard title="仕上げ" path={`${path}/finishing`} />
        <MeasureCard title="倉庫入荷" path={`${path}/warehouse`} />
      </Grid>
    </Container>
  );
};

export default MeasureList;