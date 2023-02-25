import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from './config';

export const sequelizeConnection = new Sequelize(DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await sequelizeConnection.authenticate();
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};
