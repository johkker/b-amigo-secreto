import { User } from '../entities';

export interface IUserCreate {
  name: string;
  number: string;
}

export interface IGroupCreate {
  name: string;
  value: number;
  endDate: string;
}
