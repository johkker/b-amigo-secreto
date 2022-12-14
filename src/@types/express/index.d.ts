import * as express from 'express';
import { jwt } from 'jsonwebtoken';
import { User } from '../../entities';

declare global {
  namespace Express {
    interface Request {
      newInput: any;
    }
  }
}
