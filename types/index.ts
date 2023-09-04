import { Timestamp } from "firebase/firestore";

export type User = {
  id: string,
  username: string,
  email: string;
  isAdmin: boolean;
};

export type Task = {
  id: string;
  serialNumber: string,
  staffId:string,
  processNumber: string,
  productNumber:string,
  customer: string;
  productName: string;
  sizeDetails: string;
  quantity: number;
  comment: string;
  // reception: {
  //   start: Date | any;
  //   end: Date | any;
  //   elapsedTime: 0
  // };
  pattern: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0
  };
  cutting: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0
  };
  materials: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0
  };
  sewing: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0
  };
  finishing: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0
  };
  warehouse: {
    startTime: Date | any;
    endTime: Date | any;
    elapsedTime: 0
  };
  createdAt: Timestamp;
};

export type Staff = {
  id:string;
  name:string
}
