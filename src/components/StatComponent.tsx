import { Box, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useColors } from '../hooks/useColors';
import { collection, getCountFromServer, orderBy, query, startAt } from 'firebase/firestore';
import { db } from '../../firebase';

const StatComponent = () => {
  const { bgPrimaryColor } = useColors();
  const [count, setCount] = useState(0);


  useEffect(() => {
    const getCount = async () => {
      const dt = new Date();
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;
      const coll = collection(db, "tasks");
      const q = query(coll, orderBy("createdAt", "asc"), startAt(new Date(`${year}-${month}`)));
      const snapshot = await getCountFromServer(q);
      console.log('count: ', snapshot.data().count);
      setCount(snapshot.data().count);
    };
    getCount();
  }, []);

  return (
    <Box p={3} shadow="md" bg={bgPrimaryColor} rounded="md">
      <Stat >
        <StatLabel>加工指示書件数</StatLabel>
        <StatNumber >{count}</StatNumber>
        <StatHelpText>
          <StatArrow type='decrease' />
          9.05%(前年比)
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default StatComponent;