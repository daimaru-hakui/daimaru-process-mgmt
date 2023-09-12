import {
  Box,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColors } from "../hooks/useColors";
import {
  collection,
  endAt,
  getCountFromServer,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../../firebase";

const StatComponent = () => {
  const { bgPrimaryColor } = useColors();
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [prevMonthCount, setPrevMonthCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const dt = new Date();
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;
      let prevMonth = dt.setMonth(month - 1);
      prevMonth = dt.getMonth();
      let nextMonth = dt.setMonth(month + 1);
      nextMonth = dt.getMonth();
      setThisMonthCount(await getTasksCount(year, month, nextMonth));
      setPrevMonthCount(await getTasksCount(year, month, prevMonth));
    };
    getCount();
  }, []);

  const getTasksCount = async (
    year: number,
    month: number,
    nextPrevMonth: number
  ) => {
    const coll = collection(db, "tasks");
    const q = query(
      coll,
      orderBy("createdAt", "asc"),
      startAt(new Date(`${year}-${month}`)),
      endAt(new Date(`${year}-${nextPrevMonth}`))
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const onCompareCalc = (next: number, prev: number) => {
    const result = next / prev;
    if (result === Infinity) return 0;
    return (next / prev) * 100;
  };

  return (
    <Box p={3} shadow="md" bg={bgPrimaryColor} rounded="md">
      <Stat>
        <StatLabel>加工指示書件数</StatLabel>
        <StatNumber>{thisMonthCount}</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          {onCompareCalc(thisMonthCount, prevMonthCount)}%(前年比)
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default StatComponent;
