import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const Database = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : true,
  synchronize: false,
  logging: true,
  entities:
    process.env.NODE_ENV === 'production'
      ? ['dist/entities/*.js']
      : ['src/entities/*.ts'],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migrations/*.js']
      : ['src/migrations/*.ts'],
});

Database.initialize()
  .then(() => {
    console.log('Data Source initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
