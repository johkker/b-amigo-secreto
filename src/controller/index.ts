import { Request, Response } from 'express';
import { createGroupBusiness } from '../business';

export const createGroupController = async (
  request: Request,
  response: Response
) => {
  const { users, ...rest } = request.body;
  const result = await createGroupBusiness(rest, users);
  return response.status(200).json(result);
};
