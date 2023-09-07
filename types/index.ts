import { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

export type Task = {
  id: string;
  serialNumber: string;
  staffId: string;
  processNumber: string;
  productNumber: string;
  customer: string;
  productName: string;
  sizeDetails: string;
  quantity: number;
  comment: string;
  sp: number;
  cp: number;
  salesDay: Date | any;
  standardCmt: number;
  cmtCoefficient: number;
  cmt:number
  pattern: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0;
  };
  cutting: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0;
  };
  materials: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0;
  };
  sewing: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0;
  };
  finishing: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0;
  };
  warehouse: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0;
  };
  startDate: string;
  endDate: string;
  createdAt: Timestamp;
  isCompleted: boolean;
};

export type Staff = {
  id: string;
  name: string;
};

export type Coefficient = {
  id: string;
  label: string;
  value: number;
  order: number;
};
