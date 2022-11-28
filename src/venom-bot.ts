import { create, Whatsapp } from 'venom-bot';

create({
  session: 'amigo-secreto', //name of session
  multidevice: true, // for version not multidevice use false.(default: true)
})
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

const start = async (client: Whatsapp) => {
  await client.onMessage((message) => {
    message.body === 'Teste'
      ? client
          .sendText(message.from, 'Testando')
          .then((result) => console.log('Result:', result))
          .catch((error) => console.error(error))
      : null;
  });
};
