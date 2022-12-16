require('express-async-errors');
import express from 'express';
import { create } from 'venom-bot';
import routes from './routes';
import * as fs from 'fs';
import * as https from 'https';

const app = express();

app.use(express.json());

app.use(routes);

const client = async () =>
  await create({
    session: `amigo-secreto`, //name of session
    multidevice: true, // for version not multidevice use false.(default: true)
    headless: true, // Headless chrome
    folderNameToken: './src/tokens', //folder name when saving tokens
    mkdirFolderToken: './src/tokens',
    useChrome: false,
    puppeteerOptions: {
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--use-gl=egl'],
    },
  });

export const newClient = client();

app.listen(process.env.PORT || 3000);
