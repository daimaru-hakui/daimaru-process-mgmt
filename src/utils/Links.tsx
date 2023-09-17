import { MdOutlineDashboardCustomize, MdAddTask, MdHistory } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
// import { RiAdminLine } from "react-icons/ri";
import { TfiTimer } from "react-icons/tfi";
import { SlCalender } from "react-icons/sl";
export const headerLinks = [
  {
    path: '/dashboard',
    name: 'ダッシュボード',
    icon: <MdOutlineDashboardCustomize />
  }
];

export const sidebarLinks = [
  {
    path: '/dashboard',
    name: 'ダッシュボード',
    icon: <MdOutlineDashboardCustomize />
  },
  {
    path: '/dashboard/add-task',
    name: '加工指示書登録',
    icon: <MdAddTask />
  },
  {
    path: '/dashboard/all-tasks',
    name: '加工指示書一覧',
    icon: <FaTasks />
  },
  {
    path: '/dashboard/task-histories',
    name: '加工指示書完了履歴',
    icon: <MdHistory />
  },
  {
    path: '/dashboard/all-productions',
    name: '生産スケジュール',
    icon: <SlCalender />
  },
  {
    path: '/dashboard/select',
    name: '進捗登録',
    icon: <TfiTimer />
  },
];