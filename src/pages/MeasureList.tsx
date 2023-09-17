import { Container, Grid } from "@chakra-ui/react";
import MeasureCard from "../components/MeasureCard";
import { useParams } from "react-router-dom";
import ReturnButton from "../components/ReturnButton";

const MeasureList = () => {
  const { slug } = useParams();
  const PATH = `/dashboard/select/${slug}`;

  return (
    <>
      <Container w="full" p={0} maxW={1200}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
            "2xl": "repeat(6, 1fr)",
          }}
          gap={6}
        >
          <MeasureCard title="パターン準備" path={`${PATH}/pattern`} />
          <MeasureCard title="裁断" path={`${PATH}/cutting`} />
          <MeasureCard title="資材準備" path={`${PATH}/materials`} />
          <MeasureCard title="縫製加工" path={`${PATH}/sewing`} />
          <MeasureCard title="仕上げ" path={`${PATH}/finishing`} />
          <MeasureCard title="倉庫入荷" path={`${PATH}/warehouse`} />
        </Grid>
      </Container>
      <ReturnButton />
    </>
  );
};

export default MeasureList;
