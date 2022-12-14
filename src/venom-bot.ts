import { create, Whatsapp } from 'venom-bot';
import { Group } from './entities';
import GlobalError from './errors';

export const createGroup = async (client: Whatsapp, group: Group) => {
  const newGroup = await client.createGroup(
    `Amigo Secreto ${group.name}`,
    group.users.map((user) => `55${user.number}@c.us`)
  );
  if (!newGroup)
    throw new GlobalError(
      'Erro de criação',
      'Algo aconteceu ao criar o grupo',
      500
    );

  const firstGroupMessage = await client.sendText(
    newGroup.gid._serialized,
    `Olá! Seja bem vindo ao amigo secreto "${group.name}"!
	  Para facilitar a vida de todos, o amigo secreto será feito por meio de mensagens. Estou fazendo o sorteio e estarei enviando no privado para cada um de vocês.
		Lembrando: o valor máximo do presente é de R$${group.value},00 e a data limite para entrega é ${group.endDate}.
	  Boas festas!`
  );

  if (!firstGroupMessage)
    throw new GlobalError(
      'Erro de envio',
      'Algo aconteceu ao enviar mensagem para o grupo',
      500
    );

  await Promise.all(
    group.users.map(async (user) => {
      const contactNumber = `55${user.number}@c.us`;
      const friendNumber = `55${user.reference.number}@c.us`;

      const firstPrivateMessage = await client.sendText(
        contactNumber,
        `Olá ${user.name}! Seu amigo secreto é ${user.reference.name}!`
      );

      if (!firstPrivateMessage)
        throw new GlobalError(
          'Erro de envio',
          'Algo aconteceu ao enviar mensagem para um dos participantes do amigo secreto',
          500
        );

      const contactCard = await client.sendContactVcard(
        contactNumber,
        friendNumber,
        user.reference.name
      );

      if (!contactCard)
        throw new GlobalError(
          'Erro de envio',
          'Algo aconteceu ao enviar o contato do sorteado para um dos participantes do amigo secreto',
          500
        );
    })
  );
  await client.promoteParticipant(
    newGroup.gid._serialized,
    `55${group.users[0].number}@c.us`
  );

  const secondGroupMessage = await client.sendText(
    newGroup.gid._serialized,
    `@${group.users[0].number} é agora o administrador do grupo, escolhido de forma aleatória! Até mais! :)`
  );

  if (!secondGroupMessage)
    throw new GlobalError(
      'Erro de envio',
      'Algo aconteceu ao enviar a mensagem final para o grupo',
      500
    );

  await client.leaveGroup(newGroup.gid._serialized);
};
