import { newClient } from '../app';
import { Group, User } from '../entities';
import GlobalError from '../errors';
import { IGroupCreate, IUserCreate } from '../interfaces';
import { groupRepository, userRepository } from '../repositories';
import { createGroup } from '../venom-bot';

export const createGroupBusiness = async (
  groupData: IGroupCreate,
  userData: IUserCreate[]
) => {
  if (userData.length < 3) {
    throw new GlobalError(
      'Entrada inválida',
      'O número mínimo de usuários é 3.',
      401
    );
  }
  const client = await newClient;
  const group = new Group();
  group.name = groupData.name;
  group.value = groupData.value;
  console.log(groupData.endDate);
  group.endDate = groupData.endDate;

  groupRepository.create(group);

  userData.sort(() => Math.random() - 0.5);

  const newUsers = await Promise.all(
    userData.map((user) => createUserBusiness(user, group.id))
  );
  const referencedUsers = newUsers.map((user, index) => {
    index === newUsers.length - 1
      ? (user.reference = newUsers[0])
      : (user.reference = newUsers[index + 1]);
    return user;
  });

  group.users = referencedUsers;

  await groupRepository.save(group);

  await createGroup(client, group);

  return {
    message: 'Amigo secreto criado com sucesso! Verifique seu whatsapp. :D',
  };
};

export const createUserBusiness = async (
  data: IUserCreate,
  groupId: string
) => {
  const group = await groupRepository.findOne({ where: { id: groupId } });
  if (!group) {
    throw new GlobalError(
      'Group not found',
      'Error appeared while trying to define a group to an user. Probably an asynchronous error. Contact an admin.',
      404
    );
  }

  const user = new User();
  user.name = data.name;
  user.number = data.number;
  user.group = group;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};
