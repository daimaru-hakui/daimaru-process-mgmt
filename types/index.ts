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
  processNumber: string,
  customer: string;
  productName: string;
  sizeDetails: string;
  quantity: number;
  comment: string;
  reception: {
    start: Date | any;
    end: Date | any;
  };
  pattern: {
    start: Date | any;
    end: Date | any;
  };
  cutting: {
    start: Date | any;
    end: Date | any;
  };
  materials: {
    start: Date | any;
    end: Date | any;
  };
  sewing: {
    start: Date | any;
    end: Date | any;
  };
  finishing: {
    start: Date | any;
    end: Date | any;
  };
  warehouse: {
    start: Date | any;
    end: Date | any;
  };
  createdAt: Timestamp;
};