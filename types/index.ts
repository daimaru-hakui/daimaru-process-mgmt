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
    start: Date | any;
    end: Date | any;
    elapsedTime: 0
  };
  cutting: {
    start: Date | any;
    end: Date | any;
    elapsedTime: 0
  };
  materials: {
    start: Date | any;
    end: Date | any;
    elapsedTime: 0
  };
  sewing: {
    start: Date | any;
    end: Date | any;
    elapsedTime: 0
  };
  finishing: {
    start: Date | any;
    end: Date | any;
    elapsedTime: 0
  };
  warehouse: {
    start: Date | any;
    end: Date | any;
    elapsedTime: 0
  };
  createdAt: Timestamp;
};

export type Staff = {
  id:string;
  name:string
}
