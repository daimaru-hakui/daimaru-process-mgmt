import { Timestamp } from "firebase/firestore";

export type User = {
  id: string,
  username: string,
  email: string;
  isAdmin: boolean;
};

export type Task = {
  id:string
  serialNumber: string,
  processNumber: string,
  customer: string;
  productName: string;
  sizeDetails: string;
  quantity: number;
  comment: string;
  createdAt:Timestamp
}