import { format } from "date-fns";

export const useUtils = () => {

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
      
    return days <= 0 ? hours + 1 : days + 1
  };
  return  {formatTime,timeCalc ,totalDayCount}
}
