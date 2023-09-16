import { Box, Button, Flex, Input, Select } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useStore } from '../../../store';

type Props = {
  onReset: () => void;
};

const AllTasksSearchInput: FC<Props> = ({
  onReset
}) => {
  const searchText = useStore((state) => state.searchText);
  const setSearchText = useStore((state) => state.setSearchText);
  const searchStaff = useStore((state) => state.searchStaff);
  const setSearchStaff = useStore((state) => state.setSearchStaff);
  const searchDate = useStore((state) => state.searchDate);
  const setSearchDate = useStore((state) => state.setSearchDate);
  const staffs = useStore((state) => state.staffs);

  const DateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "startDate") {
      setSearchDate(value, "startDate");
    } else {
      setSearchDate(value, "endDate");
    }
  };

  return (
    <>
      <Input
        maxW={500}
        w="full"
        placeholder='Search...'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Select
        minW={48}
        w="auto"
        placeholder='担当者を選択'
        value={searchStaff}
        onChange={(e) => setSearchStaff(e.target.value)}
      >
        {staffs.map((staff) => (
          <option key={staff.id} value={staff.id}>{staff.name}</option>
        ))}
      </Select>
      <Flex gap={1} align="center">
        <Input
          type="date"
          name="startDate"
          value={searchDate.startDate}
          onChange={DateChangeHandler}
        />
        <Box>～</Box>
        <Input
          type="date"
          name="endDate"
          value={searchDate.endDate}
          onChange={DateChangeHandler}
        />
      </Flex>
      <Button minW={24} onClick={onReset}>リセット</Button>
    </>
  );
};

export default AllTasksSearchInput;