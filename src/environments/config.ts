import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
    mongo: {
      dbName: process.env.MONGO_DB_NAME,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
    },
  };
});
