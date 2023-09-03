import { MdOutlineDashboardCustomize, MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { TfiTimer } from "react-icons/tfi";
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
    path: '/dashboard/all-tasks',
    name: 'タスク一覧',
    icon: <FaTasks />
  },
  {
    path: '/dashboard/add-task',
    name: 'タスク登録',
    icon: <MdAddTask />
  },
  {
    path: '/dashboard/measure-list',
    name: '時間計測',
    icon: <TfiTimer />
  },
  {
    path: '/dashboard/admin',
    name: '権限管理',
    icon: <RiAdminLine />
  },

];