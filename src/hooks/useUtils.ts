import { keyframes, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useStore } from "../../store";

export const useUtils = () => {
  const toast = useToast();
  const staffs = useStore((state)=>state.staffs)
  const users = useStore((state)=>state.users)

  const showToast = (
    title: string,
    status: "success" | "error",
    duration: number = 2000
  ) => {
    toast({
      title,
      status,
      duration,
      isClosable: true,
      position: "top-right",
    });
  };

  const  currentDate=()=> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const mounthStr = ("0" + month).slice(-2);
    const day = date.getDate();
    const dayStr = ("0" + day).slice(-2);
    return `${year}-${mounthStr}-${dayStr}`;
  }

  const  threeMonthsLater=()=> {
    const dt = new Date();
    const year = dt.getFullYear();
    dt.setMonth(dt.getMonth() + 1);
    const month = dt.getMonth() + 1;
    const mounthStr = ("0" + month).slice(-2);
    const day = dt.getDate();
    const dayStr = ("0" + day).slice(-2);
    return `${year}-${mounthStr}-${dayStr}`;
  }

  const formatTime = (time: any) => {
    return format(new Date(time), "yyyy年MM月dd日 HH時mm分ss秒");
  };

  const timeCalc = (time: any) => {
    if (time === 0) return "";
    if (time <= 0) return "失敗";
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60 % 24);
    const days = Math.floor(time / 1000 / 60 / 60 / 24 % 365);
    const daysText = (days === 0) ? "" : days + "日";
    const hoursText = (hours === 0) ? "" : hours + "時間";
    const minutesText = (minutes === 0) ? "" : minutes + "分";
    const secondsText = (seconds === 0) ? "" : seconds + "秒";
    return daysText + hoursText + minutesText + secondsText;
  };

  const totalDayCount = (time: any) => {
    if (time === 0) return 0;
    if (time <= 0) return 0;
    const days = Math.floor(time / 1000 / 60 / 60 / 24);
    const hours = Math.floor(time / 1000 / 60 / 60 % 24);
    return days <= 0 ? hours + 1 : days + 1;
  };

  const dateTime = (time: number) => {
    if (!time) return "";
    const dt = new Date(time);
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const mounthStr = ("0" + month).slice(-2);
    const date = dt.getDate();
    const dayStr = ("0" + date).slice(-2);
    return `${year}-${mounthStr}-${dayStr}`;
  };

  const dateArray = (start: string, end: string) => {

    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateList = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const formatedDate = {
        moonth: (d.getMonth() + 1),
        date: d.getDate(),
        day: d.getDay()
      };
      dateList.push(formatedDate);
    }
    return dateList;
  };

  const mathRound2nd = (num: number) => {
    return Math.round(num * 100) / 100;
  };

  const getStaffName = (id: string) => {
    if (!id) return "";
    const newStaff = staffs.find((staff) => staff.id === id);
    if (!newStaff) return "";
    return newStaff.name;
  };

  const getUserName = (id: string) => {
    if (!id) return "";
    const newUser = users.find((user) => user.id === id);
    if (!newUser) return "";
    return newUser.username;
  };

  const animationKeyframes = keyframes`
  0% { opacity: 0 }
  100% { opacity:1 }
`;
  const animationOpacity = `${animationKeyframes} 0.3s ease-in-out`;
  

  return {
    showToast,
    currentDate,
    threeMonthsLater,
    formatTime,
    timeCalc,
    totalDayCount,
    dateTime,
    dateArray,
    mathRound2nd,
    getStaffName,
    getUserName,
    animationOpacity
  };
};
