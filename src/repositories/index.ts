import { Group, User } from '../entities';
import { Database } from '../data-source';

export const groupRepository = Database.getRepository(Group);
export const userRepository = Database.getRepository(User);
