import {Staff} from '../../types'

export const getStaffName = (id: string, staffs:Staff[]) => {
    if (!id) return "";
    const newStaff = staffs.find((staff) => staff.id === id);
    if (!newStaff) return "";
    return newStaff.name;
  };